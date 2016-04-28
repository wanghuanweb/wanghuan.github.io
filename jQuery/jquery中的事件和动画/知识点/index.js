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
        $(this).next().slideDown();
    },function(){
        $(this).next().slideUp();
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

    /** 自定义动画animate(params,speed,callback)
      * params：一个包含样式属性和值得映射(要想改变元素的left、top、bottom、right属性，必须把position改为relative或者position)
      * speed：速度参数。可选
      * callback：在动画完成时执行的函数，可选。主要作用于比如动画执行完想要修改css样式等
      */
    //   自定义简单动画
    $("#div5").click(function(){
        $(this).animate({left:"200px"}, 3000);
    });
    //   累加累减动画
    $("#div6").click(function(){
        $(this).animate({left:"+=200px"}, 3000);
    });
    //   多重动画,往右移且改变高度
    $("#div7").click(function(){
        $(this).animate({left:"200px",height:"200px"}, 3000);
    });
    // 多重动画，按顺序执行多个，分开写或者写成链式动画
    $("#div8").click(function(){
        $(this).animate({left:"200px"}, 3000)
               .animate({height:"200px"},3000);
    });
    // 复杂动画
    $("#div9").css("opacity","0.5");
    $("#div9").click(function(){
        $(this).animate({left:"200px",height:"200px",opacity:"1"}, 3000)
               .animate({top:"200px",width:"200px"},3000)
               .fadeOut("slow");
    });
    // 动画回调函数
    $("#div10").css("opacity","0.5");
    $("#div10").click(function(){
        $(this).animate({left:"200px",height:"200px",opacity:"1"}, 3000)
               .animate({top:"200px",width:"200px"},3000,function(){
                   $(this).css("border","5px solid blue");
               });
    });
    /** 停止动画和判断是否处于动画状态--都是为了避免动画累计而导致和用户很多行为不一致
      * stop([clearQueue],[gotoEnd]);--停止当前正在执行的动画
      * clearQueue为true是清空未执行的动画队列，gotoEnd代表是否直接将正在执行的动画跳转到末状态
      * is(":animated")
      * if(! $(element).is(":animated"){}若不是正处于动画则。。。
      * delay()是延迟动画
      */
    //  应用实例，当用户频繁hover时，会累计很多动画，用stop和clearQueue为true可以提高用户体验
    $("#div11").hover(function(){
        $(this).stop(true)
               .animate({left:"200px"}, 3000)
               .animate({height:"200px"},3000);
    },function(){
        $(this).stop(true)
                .animate({top:"200px",width:"200px"},3000);
    });

});
