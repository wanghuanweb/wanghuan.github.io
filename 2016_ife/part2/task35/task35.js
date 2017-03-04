//还没能逐条执行动作。。
(function createTable() {
    var table = document.getElementById('table');
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        table.appendChild(tr_arr[i]);
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");
            tr_arr[i].appendChild(td_arr[j]);
            if (i == 0) {
                td_arr[j].setAttribute("class", "clear_border");
                if (j > 0) td_arr[j].innerHTML = j;
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "clear_border");
                if (i > 0) td_arr[0].innerHTML = i;
            }
        }
    }
    document.getElementById('command_input').value = 'MOV RIG 3 \nmoV bot 3\nMOV lef 1\ntra bot 2';
    updateLineNum()
})();

//正则分割内容框里的内容,扩展命令，添加数字
function enhanceCommand(str) {
    var filter = /\n/g;
    var inputArr = str.split(filter);
    return inputArr;
}

var robot = document.getElementById('robot_box');
var cmd_btn = document.getElementById('command_button');
var deg = 0; //初始化角度
var face = 0; //初始化方向  0: 上, 1: 右, 2: 下, 3: 左;
var xPos = 50;
var yPos = 50;

var RobotBox = {
    xPos: function() {
        xPos += "px";
        return robot.style.top
    },
    yPos: function() {
        yPos += "px"
        return robot.style.left
    },
    face: function() {
        face = face % 4;
        if (face == 0) {
            // console.log(face, "朝上");
            return face;
        } else if (face == 1) {
            // console.log(face, "朝左");
            return face;
        } else if (face == 2) {
            // console.log(face, "朝下");
            return face;
        } else if (face == 3) {
            // console.log(face, "朝右");
            return face;
        } else {
            throw "啊？"
        }
    },
    go: function(str, line_num) {
        var Li = document.getElementById('command_display_count').getElementsByTagName("li");
        Li[line_num].style.borderRadius = "10px";
        switch (str) {
            case "GO":
                switch (face) {
                    case 0:
                        RobotBox.transTop();
                        break;
                    case 1:
                        RobotBox.transLeft();
                        break;
                    case 2:
                        RobotBox.transBottom();
                        break;
                    case 3:
                        RobotBox.transRight();
                        break;
                    default:
                        alert("???");
                        break;
                }
                break;
            case "TUN LEF":
                RobotBox.turnLeft();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TRA LEF":
                RobotBox.transLeft()
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TRA TOP":
                RobotBox.transTop()
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TRA RIG":
                RobotBox.transRight()
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "TRA BOT":
                RobotBox.transBottom();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "MOV LEF":
                RobotBox.moveLeft();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "MOV TOP":
                RobotBox.moveTop();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "MOV RIG":
                RobotBox.moveRight();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            case "MOV BOT":
                RobotBox.moveBottom();
                Li[line_num].style.backgroundColor = "#7fadda";
                break;
            default: //处理错误的命令所对应的行数
                Li[line_num].style.backgroundColor = "#FF9A9A";
                break;
        }
    },
    turnLeft: function() {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        RobotBox.face();
    },
    turnRight: function() {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        RobotBox.face();
    },
    turnBack: function() {
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
        RobotBox.face();
    },
    transLeft: function() {
        setTimeout(function() {
            if (xPos > 50) {
                xPos -= 50;
                robot.style.left = xPos + 'px';
            }
        }, 20)
    },
    transTop: function() {
        setTimeout(function() {
            if (yPos > 50) {
                yPos -= 50;
                robot.style.top = yPos + 'px';
            }
        }, 20)
    },
    transRight: function() {
        setTimeout(function() {
            if (xPos < 500) {
                xPos += 50;
                robot.style.left = xPos + 'px';
            }
        }, 20)
    },
    transBottom: function() {
        setTimeout(function() {
            if (yPos < 500) {
                yPos += 50;
                robot.style.top = yPos + 'px';
            }
        }, 20)
    },
    moveLeft: function() {
        setTimeout(function () {
            if (face != 1) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(arguments.callee, 50);
            } else {
                setTimeout(RobotBox.transLeft, 1000);
            };
        }, 50);
    },
    moveTop: function() {
        setTimeout(function () {
            if (face != 0) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(arguments.callee, 50);
            } else {
                setTimeout(RobotBox.transTop, 1000);
            };
        }, 50);
    },
    moveRight: function() {
        setTimeout(function() {
            if (face != 3) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(arguments.callee, 50);//运用链式达到Interval的效果，arguments.callee的用法参考《高程设计》P611
            } else {
                setTimeout(RobotBox.transRight, 1000);
            }
        },50)
        
    },
    moveBottom: function() {
        setTimeout(function() {
            if (face != 2) { //如果方向不同
                RobotBox.turnLeft();
                setTimeout(arguments.callee, 50);
            } else {
                setTimeout(RobotBox.transBottom, 1000);
            };
        }, 50);
    },
}

/***********************************输入框区域的函数********************************/

//创建行数标记
function renderLineNum(count) {
    var command_display_count = document.getElementById('command_display_count');
    command_display_count.innerHTML = "";
    for (var i = 1; i <= count; i++) {
        var li = document.createElement("li");
        var txt = document.createTextNode(i);
        li.appendChild(txt);
        command_display_count.appendChild(li);
    }
}

//检测当前输入框文本的行数,实时更新lineNum
function updateLineNum() {
    setTimeout(
        function activeEnter() {
            var command_input = document.getElementById('command_input');
            var line_num = command_input.value; //行数
            line_num.match(/\n/g) ? renderLineNum(line_num.match(/\n/g).length + 1) : renderLineNum(1);
        }, 0)
}

//实时设置第一个li的margin值，达到滚动的效果。
function setMargin() {
    var Li = document.getElementById('command_display_count').getElementsByTagName('li');
    Li[0].style.marginTop = -command_input.scrollTop + "px";
}

//执行按钮   
function render() {
    var inputArr = enhanceCommand(command_input.value);
    var x = 0;
    (function bigLoop() {
        if (x < inputArr.length) {
            var times = "";
            if (inputArr[x].slice(0, 2).toUpperCase() == "GO") {
                conmmand_input = "GO";
                times = inputArr[x].slice(3) ? Number(inputArr[x].slice(3)) : 1;
            } else if (inputArr[x] == "") {
                conmmand_input = "blank";
                times = 1;
            } else {
                conmmand_input = inputArr[x].slice(0, 7);
                times = inputArr[x].slice(8) ? Number(inputArr[x].slice(8)) : 1;
            }

            if (isNaN(times)) { alert("次数输入有误，请规范书写！"); }
            var i = 0;

            function finalLoop() {
                if (i < times) {
                    RobotBox.go(conmmand_input.toUpperCase(), x)
                    setTimeout(finalLoop, 1000);
                    // console.log(conmmand_input, x, i, times)
                    i++;
                } else {
                    x++;
                    setTimeout(bigLoop, 1000);
                }
            }
            finalLoop();
        }
    })()
}

document.getElementById('clean_buttun').addEventListener("click", function() {
    command_input.value = "";
    updateLineNum();
}, false);
document.getElementById("refresh_button").addEventListener("click",function(){location.reload()},false)
cmd_btn.addEventListener("click", render, false);

function keyEvent(e) {
    var oEvt = e||window.event;
    var oObj = oEvt.target||oEvt.srcElement;
    var currKey=e.keyCode||e.which||e.charCode;
    switch(currKey){
        case 37:
        RobotBox.transLeft();
        break;
        case 38:
        RobotBox.transTop();
        break;
        case 39:
        RobotBox.transRight();
        break;
        case 40:
        RobotBox.transBottom();
        break;
        default:
        break;
    }
}
window.onkeydown = keyEvent;