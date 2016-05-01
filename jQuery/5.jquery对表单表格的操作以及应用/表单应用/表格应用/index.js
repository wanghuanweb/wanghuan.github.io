/**表格的应用
 * 表格单双行变色，被选择的行高亮，且单选按钮被选
 * 表格单双行变色，被选择的行高亮，且多选按钮被选(点击选中或者取消选中)
 */
$(function(){
    $(".tables tr:odd").addClass("back");
    $(".table2 tr:odd").addClass("back");

    // 初始化表格时，若默认已经有单选框被选中，则需要处理
    $(".tables :checked").parent().parent().addClass('select');

    $(".tables tr").click(function(){
        $(this).addClass('select')
               .siblings().removeClass('select')
               // 使用end方法，使当前对象时$(this)
               .end()
               .find(":radio").prop("checked",true);
    });
    // 根据是否有类来判断是否已经选中
    $(".table2 tr").click(function(){
        if($(this).hasClass('select')) {
            $(this).removeClass('select')
                   .find(":checkbox").prop("checked",false);
        } else{
            $(this).addClass('select')
                   .find(':checkbox').prop("checked",true);
        }

    });
});
