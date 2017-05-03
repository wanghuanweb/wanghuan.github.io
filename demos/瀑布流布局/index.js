window.onload = function(){
    waterfull('main','box');

    //模拟后台传过来的json数据
    var dataInt={'data':[{'src':'60.jpg'},{'src':'61.jpg'},{'src':'62.jpg'},{'src':'63.jpg'}]};
    window.onscroll = function(checkscrollside()){
        var oParent = document.getElementById('main');// 父级对象
        //遍历json
        for(var i = 0;i < dataInt.data.length;i++){
            var oBox = document.createElement('div');
            oBox.className = 'box';
            oParent.appendChild(oBox);

            var oPic = document.createElement('div');
            oBox.className = 'pic';
            oBox.appendChild(oPic);

            var oImg = document.createElement('img');
            oImg.src = 'images/' + dataInt.data[i].src;
            oPic.appendChild(oImg);
        }
        waterfall('main','box');
    }
}

function waterfull(parent,box){
    //获取parent下所有box
    var oParent = document.getElementById(parent),
        aPin = oParent.getElementsByClassName(box),
        iPinW = aPin[0].offsetWidth,
        screenWidth = window.innerWidth || document.documentElement.clientWidth || document.documentElement.clientWidth,
        num = Math.floor(screenWidth/iPinW);
    console.log(screenWidth);
    console.log(num);
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var pinHArr=[];
    for(var i = 0,len = aPin.length;i < len;i++){
        var pinH = aPin[i].offsetHeight;
        if(i < num) {
            pinHArr[i] = pinH;
        } else {
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position = 'absolute';//设置绝对位移
            aPin[i].style.top = minH+'px';
            aPin[i].style.left = aPin[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

/****
    *判断是否具备加载条件
    */
function checkscrollside(){
    var oParent = document.getElementById('main'),
        aPin = oParent.getElementsByClassName(box);
    var lastPinH = aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}
