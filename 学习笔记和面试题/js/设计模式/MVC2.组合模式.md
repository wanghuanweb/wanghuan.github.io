组合模式是为一个对象或者多个对象创建一个接口，使用户不知道处理对象的个数。

比如：需要为一个或者多个DOM节点添加类名，这时候就可以用组合模式。

```
//定义一个单例，包含的方法是获取页面上各种元素的引用并为这些元素的class标签特性加上一个classname
var elements = {
    //定义一个按照tag名称来获取DOM元素的方法
    // 若为一个元素，返回单个元素。若为多个元素，返回一个数组
    get:function(tag){
        var elems = document.getElementsByTagName(tag),
            len = elems.length,
            result = [];

        for(var i = 0 ;i < len;i++) {
            result.push(elems[i]);
        }

        return result.length === 1 ? result[0] : result;
    }
    //定义一个组合方法，用于一个或者多个元素添加className
    addClass:function(elems,newClassName) {
        var len = elems.length,
            elem;

        //判断传入的对象是数组还是单独对象
        if(Object.prototype.toString.call(elems) === "[object Array]") {
            for(var i = 0;i < len;i++) {
                elem = elem[i];
                elem.className += (elem.className === ""?"":" ") + newClassName;
            }
        } else {
            elems.className += (elem.className) === ""?"":" ") + newClassName;
        }
    }
}


var links = elements.get("a");
//该组合方法为单独元素和多个元素给出了相同的接口，明显简化了该方法的使用
elements.add(links,"custom-link");
```
