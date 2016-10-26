
$(function(){
    $category = $("ul li:gt(5):not(:last)");
    $category.hide();

    $("div.showMore button").click(function(){

        if($category.is(":visible")){
            $category.hide();
            $(this).text("显示全部品牌");
            // 单双引号间隔出现
            $("ul li a").filter(":contains('苹果')")
                    .removeClass('highLight');

        } else {
            $category.show();
            $(this).text("精简显示品牌");
            // 单双引号间隔出现
            $("ul li a").filter(":contains('苹果')")
                    .addClass('highLight');
        }
    });


});
