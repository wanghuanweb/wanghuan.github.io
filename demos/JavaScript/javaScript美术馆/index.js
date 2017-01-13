/**
 * js良好的编程习惯
 * 1.预留后路--这点体现在a标签的href属性，计算浏览器不支持js，也可以顺利跳转看到图片，虽然不是在本页中看到图片
 * 2.分离javascript--不在htmlzhong写onclick事件
 * 3.向后兼容性--封装了EventUtil
 */
(function() {
    var imgs = document.getElementById("ulList"),
        EventUtil = {
            addHandler: function(element,type,handler) {
                if(element.addEventListener) {
                    element.addEventListener(type,handler,false);
                } else if(element.attachEvent) {
                    element.attachEvent("on" + type,handler);
                } else {
                    element["on" + type] = handler;
                }
            },
            getEvent: function(event) {
                return event ? event : window.event;
            },
            getTarget: function() {
                return event.target || event.srcElement;
            },
            stopPropagation: function(event) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }
        };

    EventUtil.addHandler(imgs,"click",function(event) {
        event = EventUtil.getEvent(event);
        // 阻止事件的默认行为，也就是a链接不跳转
        event.preventDefault();
        var target = EventUtil.getTarget(event),
            place = document.getElementById("placeholder");
        console.log(target.nodeName.toUpperCase());

        if(target && target.nodeName.toUpperCase() === "A") {
            var source = target.getAttribute("href");
            place.setAttribute("src",source);
            console.log(place.getAttribute("src"));
        }
    });

}());
