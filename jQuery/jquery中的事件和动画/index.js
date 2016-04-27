$(function(){
    $("#div1 .title").next().hide();
    $("#div2 .title").next().hide();
    $("#div3 .title").next().hide();
    $("#div4 .title").next().hide();

    // mouseover,mouseout两个事件
    // 动画show和hide,提示修改元素的多个样式属性：高度宽度和不透明度
    $("#div1 .title").mouseover(function() {
        $(this).next().show(600);
    }).mouseout(function() {
        $(this).next().hide("slow");
    });

    // click事件
    // 动画fadeOut和fadeIn，改变元素的不透明度
    $("#div2 .title").click(function(){
        if($(this).next().is(":visible")){
            $(this).next().fadeOut();
        } else{
            $(this).next().fadeIn();
        }
    });

    // hover(enter,leave)
    // 光标移动到元素时，会触发第一个函数enter
    // 移出这个元素，触发第二个函数leave
    // 动画slideUp和sildeDown，改变元素的高度
    $("#div3 .title").hover(function(){
        $(this).next().slideUp();
    },function(){
        $(this).next().slideDown();
    });

    // toggle(fn1,fn2,...,fnN)--用于模拟鼠标连续点击事件
    // 第1次单击，触发第一个函数
    // 第2次单击，触发第二个函数......
    // 轮番执行这几个函数
    // 在这里效果不好！toggle(); jquery1.9以后,只能用来 "显示或隐藏匹配元素。" 功能
    $("#div4 .title").toggle(function(){
        $(this).next().show();
    },function(){
        $(this).next().hide();
    });
    // jquery对事件对象的常用属性进行封装，使得事件处理在各个浏览器中可以正常运行不需要进行浏览器类型判断
    // event.stopPropagation()--停止事件冒泡
    // event.preventDefault()--阻止元素默认行为
    // event.target
    // event.type
    // event.relatedTarget
    // event.pageX和event.pageY
    // event.which 作用是在鼠标单击实践中获取到鼠标的左中右键（返回1，2，3）
    // event.metaKey 键盘中的ctrl键

    // 模拟操作trigger
    // 1.常用模拟
    $("#btn").trigger("click");
    $("#btn").click(function() {
        $("#btn").after("<p>点击了</p>");
    });

    // 绑定事件bind

    //
});
