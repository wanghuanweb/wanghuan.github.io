/**
 * 网页字体大小的调整
 * 字体大小的调整主要是获得字体的数和单位
 * 网页选项卡的原理其实就是通过隐藏和显示来切换不同的内容
 * 主要通过标签索引和内容索引一样来实现切换
 */
$(function(){
    $("span").click(function(){
        var thisEle = $("#para").css("font-size"),
        // 获得字体大小的数字和单位
            textFontSize = parseInt(thisEle,10),
            unit = thisEle.slice(-2),
            cName = $(this).attr("class");

        if(cName == "bigger") {
            if(textFontSize <= 22) {
                textFontSize += 2;
            }
        } else if(cName == "smaller"){
            if(textFontSize >= 12) {
                textFontSize -=2;
            }
        }
        $("#para").css("font-size",textFontSize + unit);
    });

    var $div_li = $("div.tab_menu ul li"),
        $div_tab = $("div.tab_box > div");
    $div_tab.hide();
    $div_tab.first().show();
    $div_li.click(function(){
        $(this).addClass('selected')
               .siblings().removeClass('selected');
        // 获取索引
        var index = $div_li.index(this);
        $("div.tab_box > div")
               .eq(index).show()
               .siblings().hide();
    });
});
