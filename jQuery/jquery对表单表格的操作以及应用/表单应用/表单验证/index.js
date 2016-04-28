$(function(){
    var psd = document.getElementById('psd');
    $("form :input").focus(function(event) {
        if($(this).is('#userName')){
            $(this).siblings('p').html("必填，长度为4~16个字符");
            $(this).siblings('p').addClass('color');
        }
        if($(this).is('#psd')){
            $(this).siblings('p').html("必填，输入6~16位密码");
            $(this).siblings('p').addClass('color');
        }
        if($(this).is('#confirm')){
            $(this).siblings('p').html("输入相同密码");
            $(this).siblings('p').addClass('color');
        }
        if($(this).is('#eMail')){
            $(this).siblings('p').html("请输入邮箱地址");
            $(this).siblings('p').addClass('color');
        }
        if($(this).is('#tel')){
            $(this).siblings('p').html("请输入11位手机号");
            $(this).siblings('p').addClass('color');
        }
    });

    $("form :input").blur(function(event) {
        if($(this).is('#userName')){
            if(calLen(this.value.trim()) === 0) {
                $(this).siblings('p').html("姓名不能为空");
                $(this).siblings('p').addClass('color3');
            } else if(calLen(this.value.trim()) >= 4 && calLen(this.value.trim()) <= 16) {
                $(this).siblings('p').html("名称格式正确");
                $(this).siblings('p').removeClass('color3');
                $(this).siblings('p').addClass('color2');
            } else{
                $(this).siblings('p').html("输入长度为4~16的字符");
                $(this).siblings('p').addClass('color3');
            }
        }
        if($(this).is('#psd')){
            if(calLen(this.value.trim()) === 0) {
                $(this).siblings('p').html("密码不能为空");
                $(this).siblings('p').addClass('color3');
            } else if(calLen(this.value.trim()) >= 6 && calLen(this.value.trim()) <= 16) {
                $(this).siblings('p').html("密码格式正确");
                $(this).siblings('p').removeClass('color3');
                $(this).siblings('p').addClass('color2');
            } else{
                $(this).siblings('p').html("请输入长度为6~16的字符");
                $(this).siblings('p').addClass('color3');
            }
        }
        if($(this).is('#confirm')){
            if(calLen(this.value.trim()) === 0) {
                $(this).siblings('p').html("不能为空");
                $(this).siblings('p').addClass('color3');
            } else if(this.value.trim() === psd.value.trim()) {
                $(this).siblings('p').html("再次输入正确");
                $(this).siblings('p').removeClass('color3');
                $(this).siblings('p').addClass('color2');
            } else{
                $(this).siblings('p').html("再次输入错误");
                $(this).siblings('p').addClass('color3');
            }
        }
        if($(this).is('#eMail')){
            var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(calLen(this.value.trim()) === 0) {
                $(this).siblings('p').html("不能为空");
                $(this).siblings('p').addClass('color3');
            } else if(filter.test(this.value.trim())) {
                $(this).siblings('p').html("格式正确");
                $(this).siblings('p').removeClass('color3');
                $(this).siblings('p').addClass('color2');
            } else{
                $(this).siblings('p').html("格式错误");
                $(this).siblings('p').addClass('color3');
            }
        }
        if($(this).is('#tel')){
            var filter1  = /^1(3|4|5|7|8)\d{9}$/;
            if(calLen(this.value.trim()) === 0) {
                $(this).siblings('p').html("不能为空");
                $(this).siblings('p').addClass('color3');
            } else if(filter1.test(this.value.trim())) {
                $(this).siblings('p').html("格式正确");
                $(this).siblings('p').removeClass('color3');
                $(this).siblings('p').addClass('color2');
            } else{
                $(this).siblings('p').html("格式错误");
                $(this).siblings('p').addClass('color3');
            }
        }
    });
});

function calLen(content) {
  var length = 0;

  for(var i = 0,len = content.length;i < len;i++) {
    var code = content.charCodeAt(i);

    if(code >= 0 && code <=128) {
      length += 1;
    } else{
      length += 2;
    }
  }
  return length;
}
