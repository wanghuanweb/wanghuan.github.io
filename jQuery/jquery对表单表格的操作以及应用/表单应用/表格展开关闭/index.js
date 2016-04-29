/**表格的应用
 * 表格单双行变色，被选择的行高亮，且单选按钮被选
 * 表格单双行变色，被选择的行高亮，且多选按钮被选(点击选中或者取消选中)
 */
$(function(){
    $("tr.parent").click(function(){
        $(this)
        .toggleClass('select')
        .siblings('.child_'+this.id).toggle();
    });
});
