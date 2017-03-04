var txt = document.getElementById('inputText');
var content = document.getElementById("content");
var numberStatus = 0;
//左进按钮
function inputLeftIn() {
    if (numberStatus == 1) { alert("已随机选取数字，无法手动添加。");
        return false; }
    var value = validNum();
    var liNum = content.childNodes.length;
    if (value != false) {
        if (liNum < 60) {
            var newItem = document.createElement("li");
            var textnode = document.createTextNode(value);
            newItem.appendChild(textnode);
            content.insertBefore(newItem, content.childNodes[0]);
            newItem.style.height = value + 'px';
            newItem.style.width = '15px';
            newItem.setAttribute('title', value);
        } else {
            alert("最多输入60个哦~");
        }
    }
}
//右进按钮
function inputRightIn() {
    if (numberStatus == 1) { alert("已随机选取数字，无法手动添加。");
        return false; }
    var value = validNum();
    var liNum = content.childNodes.length;
    if (value != false) {
        if (liNum < 60) {
            var newItem = document.createElement("li");
            var textnode = document.createTextNode(value);
            newItem.appendChild(textnode);
            content.appendChild(newItem);

            newItem.style.height = value + 'px';
            newItem.style.width = '15px';
            newItem.setAttribute('title', value);

        } else {
            alert("最多输入60个哦！");
        }
    }
}

//左出按钮
function inputLeftOut() {
    alert("删除的最左侧节点： " + content.firstChild.innerHTML);
    content.removeChild(content.firstChild);
}
//右出按钮
function inputRightOut() {
    alert("删除的最左侧节点： " + content.childNodes[content.childNodes.length - 1].innerHTML);
    content.removeChild(content.childNodes[content.childNodes.length - 1]);
}
//给已出现的Li都添加点击事件,为了避免误操作，把这个点击删除的功能给去掉
// content.addEventListener("click", function(e) {
//     content.removeChild(e.target);
// }, false)

//过滤数字
function validNum() {
    var num = parseInt(txt.value);
    if ((isNaN(num)) || (num < 10) || (num > 100)) {
        alert("请输入10-100的数字。");
        return false;
    } else {
        return num;
    }
}

//随机来60个数字
function randomNum() {
    var html = "";
    if (status == 1) {
        return false };
    for (var i = 1; i < 40; i++) {
        var x = Math.floor(Math.random() * 90 + 10);
        html += "<li style='height:" + x + "px;width:15px;transition:all .5s;' title=" + x + ">" + x + "</li>"; //因为我排序时候提取的是innerHTML，所以这里要把值写入innerHTML
    }
    content.innerHTML = html;
    numberStatus = 1;
}

//循环遍历改变位置
function sort() {
    var Li = content.childNodes,
    len = Li.length,
    i = 0,
    j = len - 1,
    sortSpeed = 50,
    inputSpeed = document.getElementById("ideNum").value;
    if (inputSpeed.match(/^[1-9]\d/)) { sortSpeed = inputSpeed };

    function timeout() {
        if (i < len) {
            if (j > i) {
                Li[j].style.backgroundColor = "red";
                if (parseInt(Li[j].innerHTML) < parseInt(Li[j - 1].innerHTML)) {
                    temp = Li[j];
                    Li[j] = Li[j - 1];
                    Li[j - 1] = temp;
                    Li[j].style.backgroundColor = "#00FF00";
                    content.insertBefore(Li[j], Li[j - 1]);
                    setTimeout(timeout, sortSpeed);
                    j--;
                } else {
                    j--;
                    Li[j].style.backgroundColor = "#00FF00";
                    setTimeout(timeout, sortSpeed);
                }
            } else { //这个else语句很关键！！！哎，总算搞出来了，不考虑这个else的话if只搜索一遍就跳出去了！设置这个else再初始化i和j的值！
                i++;
                Li[j].style.backgroundColor = "#000";
                j = len - 1;
                setTimeout(timeout, sortSpeed);
            }
        }
    }
    setTimeout(timeout, sortSpeed);
}

document.getElementById("inputLeftIn").addEventListener("click", inputLeftIn, false);
document.getElementById("inputRightIn").addEventListener("click", inputRightIn, false);
document.getElementById("inputLeftOut").addEventListener("click", inputLeftOut, false);
document.getElementById("inputRightOut").addEventListener("click", inputRightOut, false);
document.getElementById('sort').addEventListener("click", function() {
    if(numberStatus!=1){return false};
    if (status != 1) {
        sort();
        status = 1;
    }
}, false);
document.getElementById('randomNum').addEventListener("click", randomNum, false)
document.getElementById('refresh').addEventListener('click', function() { location.reload(); }, false)
