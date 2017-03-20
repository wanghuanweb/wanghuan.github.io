$(document).ready(function() {
    // animation background
    $(".system-function-child").hover(function(){
        $(this).addClass("system-function-child-active");
        $(this).children('p').addClass('p-active');
        // modify img src
        var src =  $(this).children('img').attr("src");
        var src2 = src.replace(/normal/g,"choosen");
        $(this).children('img').attr("src",src2);
    },function(){
        $(this).removeClass("system-function-child-active");
        $(this).children('p').removeClass('p-active');
        var src =  $(this).children('img').attr("src");
        var src2 = src.replace(/choosen/g,"normal");
        $(this).children('img').attr("src",src2);
    });

    // scream scroll
    // $("#fullpage").fullpage({
    //     // paddingTop: '66px',
    //     'verticalCentered': false,
    //     'resize':true,
    //     'scrollingSpeed':700,
    //     'css3': true,
    //     'loopBottom':true,
    //     'menu':'myMenu',
    //     // 'autoscrolling':false,
    //     anchors: ['page-1', 'page-2', 'page-3', 'page-5'],
    //     'navigation': true,
    //     'navigationPosition': 'right',
    //     'navigationTooltips': ['System values', 'System features', 'Application scenes', 'contact us']
    // });
});
