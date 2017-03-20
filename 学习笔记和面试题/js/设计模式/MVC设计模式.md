https://alexatnet.com/articles/model-view-controller-mvc-javascript
可参考上述连接画出一个图来了解MVC

MVC设计模式：
首先，简单的说一下mvc分别代表声明。
model：负责把代码中的与底层数据构成的代码组合在一起。也就是表示系统的数据。
view：负责把模型中保存的数据显示在屏幕上。每个视图都需要有一个render方法。该方法接收来自模型的数据，把视图放置在当前页面。这个方法在控制器类实例化后进行调用。
controller：模型中的变化可以通过观察者模式直接反应到视图上，但是视图上的变化不能立即传到模型中。所以我们需要由控制器处理。负责处理系统中的业务逻辑，在需要的时候更新模型和视图。控制器在模型和视图之后进行实例化，模型和视图的对象作为参数传入。

其实MVC是观察者模式，组合模式和策略模式的结合。
1.模型中数据发生变化时，会运用观察者模式发布事件，传出更新的数据，而视图则监听数据的变化，使用更新后的数据来更新用户界面。--观察者模式
2.视图包含了很多子视图，用来处理UI可重用部分，运用组合模式，可以保证控制器不需要清楚逻辑内受影响的视图的数量。--组合模式
3.策略模式可以使大量视图共享相同的控制器逻辑，前提是视图都暴露一个相似的方法，命名为render().--策略模式

例子：使用MVC模型用于一个屏幕上emali地址列表的管理系统。

模型类：--表示系统的数据，email地址
1.属性需要有存储email的数组
2.addEmail方法，在email数组中添加一个email。且广播已经添加email的事件。
3.removeEmail方法，在email数组中删除一个email。广播已经删除email的事件。
4.还有一个返回所保存的email地址的完整列表

视图类：需要两个子视图
1.输入email的视图
    1.属性有输入框，按钮和表单
    2.每个视图都需要有一个render方法，这里是添加按钮和输入框并且把视图表示的DOM事件绑定
    3.DOM事件点击提交按钮后广播已提交--订阅模型发出的事件，新email添加则需要清空
2.显示email列表的视图
    1.属性有ul，li，span，button
    2.此视图的render方法，遍历模型数据email的数组，并为每个数据项创建一个列表项目，并绑定事件
    3.DOM事件点击删除按钮，则发布删除该email的事件--订阅模型发出的email被添加和email被删除的事件
    4.当监听到email被添加，在list前插入孩子显示在视图上
    5.当监听到email被删除，在list中移除该email结果显示在视图上
3.定义一个一般性视图，可以包含若干个子视图，当render被调用，依次调用子视图的render方法

控制器类：把模型连接到视图，定义该系统的

模型类代码：
```
function EmailModel(data) {
    this.emailAddresses = data || [];
}

EmailModel.prototype = {
    add: function(email){
        this.emailAddresses.unshift(email);
        //注意广播model添加了email
        observer.publish("model.email-address.added",email);
    },
    remove:function(email){
        var len = this.emailAddresses.length,
            index = 0;

        for(;index < len;i++) {
            if(this.emailAddresses[index] === email) {
                this.emailAddresses.splice(index,1);

                //注意广播model删除了email
                observer.publish("model.email-address.removed",email);
                break;
            }
        }
    },
    getAll:function(){
        return this.emailAddresses;
    }
};
```

视图类代码：

```
//第一个视图添加email的子视图
function EmailFromView(){
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.button = document.createElement("button");

    this.input.setAttribute("type","text");
    this.input.setAttribute("placeholder","New email address");

    this.button.setAttribute("type","submit");
    this.button.innerHTML = "Add";
}

EmailFromView.prototype = {
    //这个render没有模型传给它的数据
    render:function(){
        this.form.appendChild(this.input);
        this.form.appendChild(this.button);

        document.body.appendChild(this.form);

        //注意需要把视图所表示的DOM元素的各种事件进行绑定处理
        this.bindEvents();
    },

    //绑定所有的事件
    bindEvents:function(){
        var that = this;

        this.form.addEventListener("submit",function(event){
            event.preventDefault();
            //广播email地址提交
            observer.publish("view.email-view.added",that.input.value);
        },false);

        //订阅由模型发出的一个事件，一个新email添加到了model中，则要清空input的文本域
        observer.subscribe("model.email-address.added",function(){
            that.clearInputField();
        });
    },
    clearInputField:function() {
        this.input.value = "";
    }
};
//第二个视图是email的列表
function EmailListView(){
    this.list = document.createElement("ul");
    this.listItem = document.createElement("li");
    this.listItemText = document.createElement("span");
    this.listItemRemoveButton = document.createElement("button");

    this.listItemRemoveButton.innerHTML = "Remove";
}
EmailListView.prototype = {
    //render方法是遍历model数据并渲染一个列表
    render:function(modelData){
        var index = 0,
            len = madel.length,
            email;

        for(;index < len;index++) {
            email = modelData[index];
            this.list.appendChild(this.createListElement(email));
        }
        document.body.appendChild(this.list);
    },

    //传入一个方法，此方法会被传入一个email地址，会创建并返回一个表示此email地址的经填充内容的li标签
    createListElement:function(email){

        //比起原创的node，复制其实更加快速,cloneNode参数为true是克隆所有后代，否则
        var listItem = this.listItem.cloneNode(false),
            listItemText = this.listItemText.cloneNode(false),
            listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);

        //设置data-email标签特性，依次li元素所表示的email地址进行填充
        listItem.setAttribute("data-email",emali);
        listItemRemoveButton.setAttribute("data-email",email);
    },
};
```
