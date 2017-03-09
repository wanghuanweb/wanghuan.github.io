require.config({
　　　　paths: {
　　　　　　"jquery": "jquery-3.1.1.min",
            "math":"math"
　　　　}
　　});
require(['jquery'], function ($){
　　　　// some code here
            $(".btn").click(function(){
                console.log('ok');
                $(".content").html('成功！')
            });
　　});
require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});
