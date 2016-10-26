$(function(){
    $(".level1 > a").click(function(){
        $(this).addClass("highLight")
        .next().show()
        .parent().siblings().children("a").removeClass("highLight")
        .next().hide();
    });
});
