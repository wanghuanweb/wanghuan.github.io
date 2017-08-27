观察者模式又称为发布订阅模式，适用于多个独立代码模块合成的大型代码库。定义了一种一对多的关系。观察者同时监听某一个主题对象，这个主题对象的状态发生变化的时候通知所有的观察者，让他们自动更新自己。

**观察者模式的优缺点**
好处：
1.支持简单广播通信，自动通知所有订阅的对象。
2.减少模块和对象之间的耦合

缺点：
1.创建订阅者本身浪费时间和内存，并且订阅一个消息却始终不发生，订阅者还是会始终存在于内存中。
2.虽然弱化了对象的联系，但过度使用的话，对象之间的关联会被深埋在背后，导致程序难以维护。

**观察者模式的应用**

1.DOM事件
2.模块之间的通信，比如本章的表单和ajax模块

**观察者模式如何实现**

观察者模式需要一个对象和三个全局方法：

events对象的key存储事件名称，value是一个数组，存储该事件发生后需要执行的函数。

还有三个全局方法：
1.subscribe()指派函数，当特定的事件发生的时候，执行该函数。检查events的key中是否有此事件，如果没有，给一个空数组。随后，函数push到key为此事件对应的value中。
2.unsubscribe()反指派函数，当特定的事件发生的时候，该函数不执行。遍历key为此事件对应的value数组，若遍历到此函数，从数组中删除此函数。
3.publish()按照名称发布事件，也就是依次执行事件名称相关联的所有函数。找到此事件对应的回调函数数组，依次执行这些回调函数。

```
//观察者模式
var observer = (function(){
    //events是对象，key是事件，value是事件需要执行的函数，是个数组
    var events = {};

    return{
        subscribe: function(eventName,callback){
            if(!events.hasOwnProperty(eventName)){
                events[eventName] = [];
            }
            events[eventName].push(callback);
        },
        unsubcribe:function(eventName,callback){
            var length;

            if(events.hasOwnProperty(eventName)){
                length = events[eventName].length;
                for(var i = 0;i < len;i++){
                    if(events[eventName][i] === callback){
                        events[eventName].splice(i,1);
                        break;
                    }
                }
            }
        },
        publish:function(eventName){
            var data = Array.prototype.call(arguments,1),
                len;

            if(events.hasOwnProperty(eventName)){
                len = events[eventName].length;
                for(var i = 0;i < len;i++) {
                    events[eventName][i].apply(this.data);
                }
            }
        }
    }
})();
```

例子：有两个模块表单提交和ajax通信
表单提交模块：
    1.获取表单所有数据
    2.表单提交，发出全局对象form-submit
    3.订阅ajax-response事件，做响应的显示处理
ajax通信模块：
    1.订阅form-submit事件
    2.使用表单的数据和url发出ajax_post请求
    3.ajax设置回调函数，也就是发布ajax-response事件

```
//ajax模块
(function(observer){

    function ajaxPost(url,data,callback){
        var xhr;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callback(xhr.responseText);
                }
            }
        };
        xhr.open("POST",url);
        xhr.send(data);
    }

    observer.subscribe("form-submit",function(url,formData){
        ajaxPost(url,formData,function(response){
            observer.publish("ajax-response",response);
        });
    });
}(observer));
//form模块
(function(observer){
    var form = document.getElementById("my-form"),
        action = form.action,
        data = [],
        fields = document.getElementByTagName("input"),
        field,
        len = fields.length,
        thankyouMessage = document.createElement("p");

    //遍历表单所有input标签，把表单所有数据转换成一个key-value,escape是对字符串进行编码，unescape是解码
    //提交表单后，发布事件
    function onFormSubmit(event){
        event.preventDefault();
        for(var i = 0;i < len;i++){
            field = fields[i];
            data.push(escape(field.name) + "=" + escape(field.value));
        }

        observer.publish("form-submit",action,data.join("&"));
    }

    form.addEventListener("submit",onFormSubmit,false);

    //订阅ajax-response事件
    observer.subscribe("ajax-response",function(response){
        thankyouMessage.innerHTML = "Thank you for your form submission.
            <br>The server response with:" + response;
        form.parentNode.appendChild(thankyouMessage);
    });

}(observer));
```

**自定义事件--基于观察者模式**

自定义事件其实符合观察者模式，自定义事件创建一个管理事件的对象，让其他对象监听那些事件。
实现此功能的基本模式：

```
function EventTarget(){
    this.handlers = {};
}
EventTarget.prototype = {
    constructor:EventTarget,

    //注册事件
    addHandler:function(type,handler){
        if(typeof this.handlers[type] == "undefined"){
            handlers[type] = [];
        }
        handlers[type].push(handler);
    },

    //触发事件
    fire:function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for(var i = 0,len = handlers.length;i < len;i++){
                handlers[i](event);
            }
        }
    },

    //注销事件
    removeHandler:function(){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type],
                len = handlers.length;
            for(var i = 0;i < len;i++){
                if(handlers[i] === handler){
                    handlers.splice(i,1);
                    break;
                }
            }
        }
    }
};

//如下使用EventTarget类型的自定义事件
function handlerMessage(event) {
    alert("Message received:"+ event.message);
}

//创建一个新对象
var target = new EventTarget();
//添加一个事件处理程序
target.addHandler("message",handlerMessage);
//触发程序
target.fire({type:"message",message:"Hello World!"});
//删除事件处理程序
target.removeHandler("message",handlerMessage);
//再次，应没有处理程序
target.fire({type:"message",message:"Hello World!"});
```
