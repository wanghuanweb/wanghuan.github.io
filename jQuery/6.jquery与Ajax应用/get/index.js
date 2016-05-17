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
 * $.get(url [.data] [.callback] [.type])
 * @param url(String)-请求HTML页面的url地址
 * @param data(Object)-可选，发送到服务器的key/value数据,附加到请求URL中
 * @param callback(Function)-载入成功时的回调函数
 * @param type--服务器返回内容的格式，包括xml，htm，script，json,text,_default
 */
$(function(){
    $("#send").click(function(){
        $.get("get.php",{
            // 将获取的数据传给后台
            username: $(".username").val(),
            content: $(".content").val()
        }),function(data,textStatus){
            // 服务器端接收到传递的data数据并成功返回，就可以通过回调函数将返回数据显示在页面上
            var username = data.username,
                content = data.content,
                txthtml = "<div class="comment"><h6>"
                          + username + ":</h6><p class="para">"
                          + content + "</p></div>";
            $("#resText").html(txthtml);
        }
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
