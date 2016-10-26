/**
 * 首先在nodejs中，执行npm install -g http-server，安装server
 *  在工程目录下运行http-server -p 80
 *  在浏览器中访问127.0.0.1
 */
/**
 * jQuery对Ajax进行了封装
 * 在jQuery中$.ajax()方法属于最底层的方法
 * 第二层是load()、$.get()、$.post()
 * 第三层是$.getScript()、$.getJSON()
 */
/**
 * load(url [.data] [.callback])方法：jquery最常用的Ajax方法，可以载入远程HTML代码并插入到DOM中
 * @param url(String)-请求HTML页面的url地址
 * @param data(Object)-可选，发送到服务器的key/value数据
 * @param callback(Function)-请求完成时的回调函数，无论请求成功或失败
 * 传递方式：无参数时get方式，有参数时采用post方式
 * load通常用来获取静态的数据文件，需要传递参数给服务器的页面用$.get()、$.post()
 */
$(function(){
    $("#send").click(function(){
        $("#resText").load("test.html");
    });
});
// // 返回的数据格式是html片段
//     $("#send").click(function(){
//         $.get("get1.php",{
//             username: $("#username").val();
//             content: $("#content").val();
//         },function(data,textStatus){
//             $("#resText").html(data);
//         });
//     });
// // 返回的数据格式是xml片段
//     $("#send").click(function(){
//         $.get("get2.php",{
//             username: $("#username").val();
//             content: $("#content").val();
//         },function(data,textStatus){
//             var username = $(data).find("comment").attr("username");
//             var content = $(data).find("comment content").text();
//             var txtHtml = "<div class="comment"><h6>"+username+"</h6><p class="para">"+content+"</p></div>";
//             $("#resText").html(txtHtml);
//         });
//     });
// // 返回的数据格式是json片段
//     $("#send").click(function(){
//         $.get("get3.php",{
//             username: $("#username").val();
//             content: $("#content").val();
//         },function(data,textStatus){
//             var username = data.username;
//             var content = data.content;
//             var txtHtml = "<div class="comment"><h6>"+username+"</h6><p class="para">"
//                             +content+"</p></div>";
//             $("#resText").html(txtHtml);
//         },"json");
//     });
//
//     $(function(){
//         $.getScript("jquery.color.js",function(){
//             $("#go").animate({backgroundColor:'pink'},1000)
//                     .animate({backgroundColor: 'blue'}, 1000);
//         })
//     });
// // 虽然加载JSON文件，但是没有告诉js对返回的数据如何处理，所以网页上看不到任何效果
//     $(function(){
//         $("#send").click(function() {
//             $.getJSON("text.json");
//         });
//     })
// // 处理返回的数据
//     $(function(){
//         $("#send").click(function() {
//             $.getJSON("text.json",function(data){
//                 // 返回数据成功后，首先清空id为‘resText’的元素的内容，以便构造新的HTML，然后通过$.each()循环函数依次遍历每个项
//                 // 并将遍历出来的内容构造成html代码拼接出来
//                 // 最后将构建好得HTML添加的id为"resText"的元素中
//                 $("resText").empty();
//                 var html = "";
//                 $.each(data,function(commentIndex,comment) {
//                     html += '<div class="comment"<h6>'
//                          + comment['username']+':</h6><p class="para">'
//                          + comment['content'] + '</p></div>';
//                 });
//                 $('resText').html(html);
//             });
//         });
//     })
//
//     $("#send").click(function() {
//         $.get("get1.php",$("#form1".serialize(),function(data,textStatus){
//             $("resText").html(data);
//         });
//     });
//
// });
