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
})();

var robot = document.getElementById('robot_box');
var cmd_btn = document.getElementById('comand_button');
var t_left = document.getElementById('turn_left');
var t_right = document.getElementById('turn_right');
var t_back = document.getElementById('turn_back');
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
            console.log(face, "朝上");
            return face;
        } else if (face == 1) {
            console.log(face, "朝左");
            return face;
        } else if (face == 2) {
            console.log(face, "朝下");
            return face;
        } else {
            console.log(face, "朝右");
            return face;
        }
    },
    go: function() {
        var comand_input = document.getElementById('comand_input')
        switch (comand_input.value) {
            case "":
                switch (face) {
                    case 0:
                        if (yPos > 50) {
                            yPos -= 50;
                            robot.style.top = yPos + 'px';
                        }
                        break;
                    case 1:
                        if (xPos > 50) {
                            xPos -= 50;
                            robot.style.left = xPos + 'px';
                        }
                        break;
                    case 2:
                        if (yPos < 500) {
                            yPos += 50;
                            robot.style.top = yPos + 'px';
                        }
                        break;
                    default:
                        if (xPos < 500) {
                            xPos += 50;
                            robot.style.left = xPos + 'px';
                        }
                        break;
                }
                break;
            case "TUN LEF":
                RobotBox.turnLeft();
                break;
            case "TUN RIG":
                RobotBox.turnRight();
                break;
            case "TUN BAC":
                RobotBox.turnBack();
                break;
            default:
                alert("在输入框中允许输入如下指令,TUN LEF：向左转,TUN RIG：向右转,TUN BAC：向右转,不填任何指令则默认向头顶朝的方向前进一格")
        }
    },
    turnLeft: function() {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        RobotBox.face()
    },
    turnRight: function() {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        RobotBox.face()
    },
    turnBack: function() {
        // face = face%4;
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;

        RobotBox.face()
    },
}


cmd_btn.addEventListener("click", RobotBox.go, false)
t_left.addEventListener("click", RobotBox.turnLeft, false);
t_right.addEventListener("click", RobotBox.turnRight, false);
t_back.addEventListener("click", RobotBox.turnBack, false);