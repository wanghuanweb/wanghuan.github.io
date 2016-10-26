/** js中DOM操作三个方面
 * DOM core:getElementsByClassName('className'),getElementById('id')，getAttribute("src")否是DOM core
 * HTML-DOM：documents.forms,element.src等（相比dom core代码更加简洁）
 * CSS-DOM：element.style.color:red;主要就是获取和设置style对象的各种属性
*/
// 看jQuery中的DOM操作
$(function(){
    // 查找元素节点和属性节点
    var $li = $("ul li:eq(1)");
    var $text = $li.attr("title");
    // 创建节点，也可以添加属性等
    var $li_1 = $("<li>橘子</li>");
    var $li_2 = $("<li>火龙果</li>");
    $("ul").append($li_1);// 不要加引号，否则就是添加字符串了
    $("ul").append($li_2);
    // 插入节点append,prepend,after,before
    $("ul").append($li_1);// append是将$li_1放在ul内部元素的最后面
    $("ul").prepend($li_2);// prepend是将$li_1放在ul内部元素的最前面
    $("ul").after('<b>啦啦</b>');// after是在ul元素之后插入内容
    $("ul").before('<b>啦啦</b>');// before是在ul元素之前插入内容
    // 删除节点remove,detach,empty，注意三者区别
    var $li_3 = $("ul li:eq(0)").remove();
    // 可以选择性移除 $("ul li").remove("li[title!=菠萝]");
    // 复制节点clone
    $("ul li").click(function() {
        $(this).clone().appendTo('ul');
    });
    // 替换节点replaceWith,replaceAll（一样）
    $("p").replaceWith("<p>你最不喜欢的水果是什么?</p>");
    // 包裹节点wrap,wrapAll,wrapInner,
    // 属性操作
    var t1 = $("p").attr("title");
    $("p").attr("title","your title");
    $("p").attr({"title":"your title","name":"test"});
    $("p").removeAttr('title');
    // 样式操作addClass,removeClass,toggleClass,hasClass实际调用了is方法，但hasClass易读
    $("p").hasClass('another');// 等价于$("p").is('.another');
    // 设置和获取HTML.文本、值html(),text(),val()
    // 遍历节点children(),next(),prev(),siblings(),closest(),parent(),parents()
    // CSS-DOM操作
    $("p").css("color","red");
    $("p").css({"color":"red","background":"black"});
});
