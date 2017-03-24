$(document).ready(function() {
    var scale = 1 / window.devicePixelRatio;
    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    var html=document.querySelector('html');
    var width=html.getBoundingClientRect().width;
    //16为一基准值，可自己设置不同的基准值，注意设置页面中元素字体大小是不要设置过小的rem,避免出现小于12px的字体
    html.style.fontSize=width/16+'px';
    
    var count = 1;
    var time = null;

    // switch banner
    $(".banner .banner-list").eq(0).show().siblings("div").hide();

    $(".banner .banner-btns li").click(function() {
        // 索引是1-4的时候
        count = $(this).index();
        $(this).addClass("hov").siblings("li").removeClass("hov");
        $(".banner .banner-list").eq(count-1).fadeIn(1000).siblings("div").fadeOut(1000);
    });

    $(".banner").mouseover(function(event) {
        /* Act on the event */
        clearInterval(time);
    }).mouseout(function(event) {
        /* Act on the event */
        autoPlay();
    });

    // product-features animation
    $(".contentModule1").hover(function(){
        $("#contentModule1-1").attr("src","image/product-features/1-choosen.png");
        $("#contentModule1-2").attr("src","image/product-features/1-2choosen.png");
        $("#contentModule1-2").addClass("contentModule-active");
    },function(){
        $("#contentModule1-1").attr("src","image/product-features/1.png");
        $("#contentModule1-2").attr("src","image/product-features/1-2.png");
        $("#contentModule1-2").removeClass("contentModule-active");
    });

    $(".contentModule2").hover(function(){
        $("#contentModule2-1").attr("src","image/product-features/2-choosen.png");
        $("#contentModule2-2").attr("src","image/product-features/1-2choosen.png");
        $("#contentModule2-2").addClass("contentModule-active");
        // $("#contentModule-p2").addClass("contentModulep-active");
    },function(){
        $("#contentModule2-1").attr("src","image/product-features/2.png");
        $("#contentModule2-2").attr("src","image/product-features/1-2.png");
        $("#contentModule2-2").removeClass("contentModule-active");
        // $("#contentModule-p2").removeClass("contentModulep-active");
    });

    $(".contentModule3").hover(function(){
        $("#contentModule3-1").attr("src","image/product-features/3-choosen.png");
        $("#contentModule3-2").attr("src","image/product-features/1-2choosen.png");
        $("#contentModule3-2").addClass("contentModule-active");
        // $("#contentModule-p3").addClass("contentModulep-active");
    },function(){
        $("#contentModule3-1").attr("src","image/product-features/3.png");
        $("#contentModule3-2").attr("src","image/product-features/1-2.png");
        $("#contentModule3-2").removeClass("contentModule-active");
        // $("#contentModule-p3").removeClass("contentModulep-active");
    });

    $(".contentModule4").hover(function(){
        $("#contentModule4-1").attr("src","image/product-features/4-choosen.png");
        $("#contentModule4-2").attr("src","image/product-features/1-2choosen.png");
        $("#contentModule4-2").addClass("contentModule-active");
        // $("#contentModule-p4").addClass("contentModulep-active");
    },function(){
        $("#contentModule4-1").attr("src","image/product-features/4.png");
        $("#contentModule4-2").attr("src","image/product-features/1-2.png");
        $("#contentModule4-2").removeClass("contentModule-active");
        // $("#contentModule-p4").removeClass("contentModulep-active");
    });

    autoPlay();

    // scream scroll
    $("#fullpage").fullpage({
        // paddingTop: '66px',
        'verticalCentered': false,
        'resize':true,
        'scrollingSpeed':700,
        'css3': true,
        'loopBottom':true,
        'menu':'myMenu',
        // 'autoscrolling':false,
        'anchors': ['page-1', 'page-2', 'page-3', 'page-4','page-5'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['Focus and speciality', 'Product features', 'Standard features', 'Service content','Contact us']
    });


    function autoPlay() {
        time = setInterval(function() {
            count++;
            if(count <= 4) {
                $(".banner .banner-btns li").eq(count).addClass('hov').siblings().removeClass('hov');
                $(".banner .banner-list").eq(count-1).fadeIn(1000).siblings("div").fadeOut(500);
            } else {
                count = count - 1;
            }
        },2000);
    }
    new Vue({
        el:"#myMenu",
        data:{
            items:[
                {childMsg:'首页'},
                {childMsg:'产品功能'},
                {childMsg:'标准内容'},
                {childMsg:'服务介绍'},
                {childMsg:'联系我们'}
            ]
        }
    });


});
