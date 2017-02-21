var i = 0;
init();

function init() {
    window.setInterval("bannerFun()",2000);
}

function bannerFun() {
    var ulList = document.getElementById("imgList"),
        image = ulList.getElementsByTagName("li"),
        len = image.length,
        left = ulList.offsetLeft,
        width = image.offsetWidth;

    //left从0开始逐渐递减，图片盒子向左移动。
    //当所有图片都移动到左边之后，left=0，重新开始，形成循环播放。
    if(left > -width*(len-1)) {
        left = left - width;
        i = i + 1;
    } else {
        left = 0;
        i = 0;
    }
    ulList.style.left = left + "px";

}
