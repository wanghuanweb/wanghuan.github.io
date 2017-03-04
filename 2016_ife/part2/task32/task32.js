//表单工厂
function FormFactory(name, type, func, rules, success, fail) {
    this.label = name; // 表单标签
    this.type = type; // 表单类型
    this.validator = func; // 表单验证规
    this.rules = rules; // 填写规则提示
    this.success = success; // 验证通过提示
    this.fail = fail // 验证失败提示
}

//验证的工厂
var CheckFactory = {
    name: function() {
        function getLength(str) {
            var countLength = 0;
            for (var i = 0; i < str.length; i++) {
                char_code = str.charCodeAt(i); //取每一个字符的code值
                if (char_code >= 0 && char_code <= 128) {
                    countLength += 1; //如果非汉字就自加1
                } else {
                    countLength += 2; //如果非汉字以外就自加2
                }
            }
            return countLength;
        };
        var name_info = document.getElementsByClassName('name');
        for(var i=0;i<name_info.length;i++){
            name_info[i].onblur = function(e){
                if (e.target.value == "") { //验证是否为空
                    e.target.nextElementSibling.innerHTML = name_input.rules;
                    console.log("111")
                } else if (getLength(e.target.value) < 4 || getLength(e.target.value) > 16) { //验证长度是否符合标准
                    e.target.nextElementSibling.setAttribute("class", "fail");
                    e.target.setAttribute("class", "fail");
                    e.target.nextElementSibling.innerHTML = name_input.fail;
                    console.log("222")
                } else {
                    e.target.nextElementSibling.setAttribute("class", "success");
                    e.target.setAttribute("class", "success");
                    e.target.nextElementSibling.innerHTML = name_input.success;
                    console.log("333")
                }
            }
        }
    },
    password: function() {
        var password_info = document.getElementsByClassName('password');
        for(var i=0;i<password_info.length;i++){
            password_info[i].onblur = function(e){
                if (e.target.value != "") {
                    e.target.nextElementSibling.setAttribute("class", "success");
                    e.target.setAttribute("class", "success");
                    this.nextElementSibling.innerHTML = password_input.success;
                } else {
                    e.target.nextElementSibling.setAttribute("class", "rules");
                    e.target.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = password_input.rules;
                }
            }
        }
    },
    password_confirm: function() {
        var password_confirm_info = document.getElementsByClassName('password_confirm');
        for(var i=0;i<password_confirm_info.length;i++){
            password_confirm_info[i].onblur = function(){
                if (this.value != "") {
                    if (this.parentNode.previousSibling.childNodes[1].value === this.value) {
                        this.nextElementSibling.setAttribute("class", "success");
                        this.setAttribute("class", "success");
                        this.nextElementSibling.innerHTML = password_confirm_input.success;
                    } else {
                        this.nextElementSibling.setAttribute("class", "fail");
                        this.setAttribute("class", "fail");
                        this.nextElementSibling.innerHTML = password_confirm_input.fail;
                    }
                } else {
                    this.nextElementSibling.setAttribute("class", "rules");
                    this.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = password_confirm_input.rules;
                }
            }
        }
    },
    email: function() {
        var email_info = document.getElementsByClassName('email');
        for(var i=0;i<email_info.length;i++){
            email_info[i].onblur = function(e){
                if (this.value != "") {
                    var filter = /^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/;
                    if (filter.test(this.value)) {
                        this.nextElementSibling.setAttribute("class", "success");
                        this.setAttribute("class", "success");
                        this.nextElementSibling.innerHTML = email_input.success;
                    } else {
                        this.nextElementSibling.setAttribute("class", "fail");
                        this.setAttribute("class", "fail");
                        this.nextElementSibling.innerHTML = email_input.fail;
                    }
                } else {
                    this.nextElementSibling.setAttribute("class", "rules");
                    this.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = email_input.rules;
                }
            }
        }
    },
    phone: function() {
        var phone_info = document.getElementsByClassName('phone');
        for(var i=0;i<phone_info.length;i++){
            phone_info[i].onblur = function(){
                if (this.value != "") {
                    var filter = /^1[3|4|5|8][0-9]\d{8}$/i;
                    if (filter.test(this.value)) {
                        this.nextElementSibling.setAttribute("class", "success");
                        this.setAttribute("class", "success");
                        this.nextElementSibling.innerHTML = phone_input.success;
                    } else {
                        this.nextElementSibling.setAttribute("class", "fail");
                        this.setAttribute("class", "fail");
                        this.nextElementSibling.innerHTML = phone_input.fail;
                    }
                } else {
                    this.nextElementSibling.setAttribute("class", "rules");
                    this.setAttribute("class", "rules");
                    this.nextElementSibling.innerHTML = phone_input.rules;
                }
            }
        }
    }
}

var name_input = new FormFactory("name", "text", CheckFactory.name, "必填，长度为4-16个字符", "名称格式正确", "长度只能为为4~16个字符");
var password_input = new FormFactory("password", "password", CheckFactory.password, "请输入密码", "密码可用", "请输入密码");
var password_confirm_input = new FormFactory("password_confirm", "password", CheckFactory.password_confirm, "再次输入相同的密码", "密码输入一致", "密码输入不一致");
var email_input = new FormFactory("email", "email", CheckFactory.email, "输入您的邮箱", "邮箱格式正确", "邮箱格式错误");
var phone_input = new FormFactory("phone", "text", CheckFactory.phone, "输入您的手机号码", "手机格式正确", "手机格式错误");

var inputArray = [name_input, password_input, password_confirm_input, email_input, phone_input]; //把对象们存入数组

var labelTranslate = { //中文名对象
    name: "名称",
    password: "密码",
    password_confirm: "确认密码",
    email: "邮箱",
    phone: "手机号码",
}

var checkboxArray = ["checkbox_name", "checkbox_password", "checkbox_password_confirm", "checkbox_email", "checkbox_phone"];

var count = [];
var renderForm = function() {
    var html = "";
    for (var i = 0; i < checkboxArray.length; i++) {
        if (document.getElementById(checkboxArray[i]).checked == true) {
            var checked_name = checkboxArray[i].slice(9);
            html += "<div><label for='" + inputArray[i].label + "'>" + labelTranslate[checked_name] + "</label><input type='" + inputArray[i].type + "' class='" + inputArray[i].label + "' /><p>" + inputArray[i].rules + "</p></div>";
            count.push(inputArray[i]); //把选出的Input组成新的数组，等会回调他们的验证函数 
        }
    }

    html = "<div class='factory'>" + html + "</div>";
    document.getElementById('form').innerHTML += html;
    //for in循环精准对被选择了的Input进行验证
    for (var x in count) {
            var date = new Date()
            count[x].validator();
            // console.log(count[x],date)
        }
    console.log(count)
}

document.getElementById('create').addEventListener("click", renderForm, false);
document.getElementById('reset').addEventListener("click", function(){location.reload();}, false);