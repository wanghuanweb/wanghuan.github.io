require.config({
　　　　paths: {
　　　　　　"jquery": "jquery-3.1.1.min",
　　　　}
　　});
require(['jquery'], function ($){
　　　　// some code here
　　　　$(".bottom").html("hhh");
　　});
