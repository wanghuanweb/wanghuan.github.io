/**
 * 表单应有
 * 单行文本框获取和失去焦点
 * textarea
 * 复选框应有--复选框的全选，反选，全不选等
 * select应用
*/
$(function(){
    // :input选择器，选择了所有的input、textarea、button、select元素
    // 单行文本框获取和失去焦点
    $(":input").focus(function() {
        $(this).addClass('focus');
    }).blur(function() {
        $(this).removeClass('focus');
    });
    // 这里之前用attr，点击只有一次的反应，用prop才可以
    // 因为引用的jquery是最新版本的，最新版本的jquery中有prop，且了解下两者区别
    $("#checkAll").click(function() {
        $("[name='sports']:checkbox").prop("checked",true);
    });

    $("#checkNo").click(function() {
        $("[name='sports']:checkbox").prop("checked",false);
    });

    $("#checkOppo").click(function() {
        $("[name='sports']:checkbox").each(function(){
            $(this).prop("checked",!$(this).prop("checked"));
        });
    });

    $("#checkAllNo").click(function() {
        // 注意this和$(this)的区别
        if(this.checked) {
            $("[name='sports2']:checkbox").prop("checked",true);
        } else{
            $("[name='sports2']:checkbox").prop("checked",false);
        }
    });
    // 重要
    // 将全选checkAllNo和几个球类sports2多选框绑定
    $("[name='sports2']:checkbox").click(function(){
        var flag = true;
        $("[name='sports2']:checkbox").each(function(){
            if(!this.checked){
                flag = false;
            }
        });
        $("#checkAllNo").prop('checked',flag);
    });

    $("#add").click(function(){
        var $options = $("#select1 option:selected");
        var $remove = $options.remove();
        $remove.appendTo('#select2');
    });

    $("#cancel").click(function(){
        var $options = $("#select2 option:selected");
        var $remove = $options.remove();
        $remove.appendTo('#select1');
    });

});
