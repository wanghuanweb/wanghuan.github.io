/**
 * 事件处理程序：
 * 从四方面比较(难易度，跨浏览器，作用域，是否可以添加多个事件)
 * 1.HTML事件处理程序
 * 2.DOM0级事件处理程序--简单，具有跨浏览器的优势，作用域是该元素，否
 * 3.DOM2级事件处理程序--较难，跨浏览器的优势不明显，作用域是该元素，可以
 * 4.IE事件处理程序--较难，跨浏览器的优势不明显，作用域是全局作用域，可以
 * 5.跨浏览器的事件处理程序
 *
 * 事件对象event(注意IE和其他浏览器的区别)
 *
 * 事件类型
 */

init();

function init() {
    var btn1 = document.getElementById('btn1'),
        btn2 = document.getElementById('btn2'),
        btn3 = document.getElementById('btn3'),
        btn4 = document.getElementById('btn4'),
        btn5 = document.getElementById('btn5'),
        img = document.getElementById('img');

    // DOM0级事件处理程序
    // 不可支持多个相同事件，执行第二个
    btn1.onclick = function(){
        console.log(this.id);
    };
    btn1.onclick = function(){
        console.log("w");
    };
    // 删除DOM0级事件
    // btn1.onclick = null;


    // DOM2级事件处理程序
    // 支持多个同类事件，输出两个btn2
    btn2.addEventListener("click",function(){
        console.log(this.id);
    },false);
    btn2.addEventListener("click",function(){
        console.log(this.id);
    },false);
    // 删除DOM2级事件,用removeEventListener移除，传入的参数与添加处理程序时使用相同的参数，
    // 这就意味着addEventListener()添加的匿名函数无法删除


    // IE事件处理程序，但是ie11好像也不支持了~注意这是onclick
    // 支持多个同类事件，输出两个btn2
    // btn3.attachEvent("onclick",function(){
    //     console.log(this.id);
    // });
    // btn3.attachEvent("onclick",function(){
    //     console.log(this.id);
    // });
    // 删除DOM2级事件,用removeEventListener移除，传入的参数与添加处理程序时使用相同的参数，
    // 这就意味着addEventListener()添加的匿名函数无法删除


    // 跨浏览器的事件处理程序
    var EventUtil = {

        // 跨浏览器的事件处理程序
        addHandler: function(element,type,handler) {
            if(element.addEventListener) {
                element.addEventListener(type,handler,false);
            } else if(element.attachEvent) {
                element.attachEvent("on" + type,handler);
            } else{
                element["on" + type] = handler;
            }
        },

        // DOM和IE中的event对象不同
        // 返回对event对象的引用，因为IE中事件对象的位置不同
        getEvent:function(event) {
            return event ? event : window.event;
        },

        // 返回事件的目标
        getTarget:function(event) {
            return event.target || event.srcElement;
        },

        // 取消事件的默认行为
        preventDefault:function(event) {
            if(event.preventDefault()) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        // 取消事件
        removeHandler:function(element,type,handler) {
            if(element.removeEventListener) {
                element.removeEventListener(type,handler,false);
            } else if(element.detachEvent) {
                element.detachEvent("on" + type,handler);
            }else {
                element["on"+type] = null;
            }
        },

        // 取消事件的冒泡
        stopPropagation:function(event) {
            if(event.stopPropagation()) {
                event.stopPropagation();
            } else{
                event.cancelBubble = true;
            }
        }
    };

    var handler = function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        EventUtil.stopPropagation(event);
        console.log(this.id);
        console.log(event.target);
    };
    EventUtil.addHandler(btn4,"click",handler);
    // 图片加载完console.log出信息
    EventUtil.addHandler(img,"load",function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        console.log(target.src);
    });

}
