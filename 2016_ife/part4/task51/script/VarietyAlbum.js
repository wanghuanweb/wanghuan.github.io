(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';

    function VarietyAlbum(dom,opts) {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };

        // 公有变量图片链接
        this.src = "http://cued.xunlei.com/demos/publ/img/P_";
        this.image =[];//初始化存储包括照片宽高，宽高比，照片链接的数组
        this.opts = {};
        this.container = dom;//传容器
    }

    // 私有变量
    var imgNumber =0;

    /************* 以下是本库提供的公有方法 *************/

    VarietyAlbum.prototype.init = function(dom,opts){
        var album = new VarietyAlbum(dom,opts);
        return album
    }

    VarietyAlbum.prototype.setOption = function(opts){//根据不同的layout选择不同初始化
        this.opts = opts;
        this.getLayout();
    }

    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    VarietyAlbum.prototype.getLayout = function() {
        switch(this.opts.layout){
            case 1:
                this.puzzleInit();
            break;
            case 2:
                this.waterfallInit();
            break;
            case 3:
                this.barrelInit();
            break;
            default:
            break;
        }
        // this.bindResize()
    };
    // VarietyAlbum.prototype.bindResize = function(){
    //     switch(this.opts.layout){
    //         case 1:
    //         window.onresize = function() {
    //             return 
    //         }
    //         break;
    //         case 2:
    //         case 3:
    //         window.onresize = function() {
    //             window.location.reload();
    //         }
    //         break;
    //         default:
    //         break;
    //     }
    // }
    VarietyAlbum.prototype.barrelInit = function(){
        this.container.style.width = document.documentElement.clientWidth - 30 + "px";
        this.setImage();
        this.getRatioWidth();
        this.bindScroll();
    }

    VarietyAlbum.prototype.handlerComplete = function(){
        switch(this.opts.layout){
            case 1:
            break;
            case 2:
            break;
            case 3:
                this.getRatioWidth();
            break;
            default:
            break;
        }
    }
    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    VarietyAlbum.prototype.setImage = function (image, option) {
        
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }

        // 先把图片的宽高信息，链接，宽高比存到新数组里
        var self = this,
            i = 0,
            timer = 0;

        function imgIntrvl() {
            var index = self.getIndex(imgNumber),
                img = document.createElement("img");
            img.src = self.src + index + ".jpg";
            if (img.width > 0 && img.height > 0) {
                self.image.push({
                    width: img.width,
                    height: img.height,
                    src: self.src + index + ".jpg",
                    ratio: img.width / img.height,
                });
                imgNumber++;
                i++;
                if (i > self.opts.loadNumber) {//储存30条信息
                    imgNumber = 0;
                    clearInterval(setImg);
                    timer = 1;
                }
                if (timer == 1) {//储存完毕则通过判断决定下一步的render
                    document.getElementsByClassName("mask")[0].style.display = "none";
                    self.handlerComplete();
                }
            }
        }
        var setImg = setInterval(imgIntrvl, 0);
    };

    /**
     * 特殊化序列号
     * @param  {string} val 初始的索引值
     * @return {string}     需要的索引值
     */
    VarietyAlbum.prototype.getIndex = function(val) {
        var index;
        if (val < 10) {
            index = "00" + val;
        } else if (val < 100) {
            index = "0" + val;
        }
        return index;
    }

    VarietyAlbum.prototype.getRatioWidth = function(){
        var imgsWidth = 0,
            tempArr = []; //暂存每一行的照片
        if(this.image!==undefined)
        for (var i = 0; i < this.image.length; i++) {
            var img = new Image();
            img.src = this.image[i].src;

            this.image[i].width = this.image[i].ratio * this.opts.barrelHeight; //转换每张图片的宽
            imgsWidth += this.image[i].width;
            tempArr.push(this.image[i]);
            if (imgsWidth > this.container.clientWidth) {
                this.opts.rows.push(tempArr);
                this.opts.rows.push(this.opts.barrelHeight * (this.container.clientWidth / imgsWidth));
                imgsWidth = 0;
                tempArr = [];
            }
        }
        this.renderBarrel();
    }
    VarietyAlbum.prototype.renderBarrel = function(){
        var index;
        for (var i = 0; i < this.opts.rows.length; i += 2) {
            var div = document.createElement("div");
            for (var j = 0; j < this.opts.rows[i].length; j++) {
                var img = new Image();
                img.src = this.opts.rows[i][j].src;
                div.appendChild(img);
                index = i + 1;
                div.style.height = this.opts.rows[index] + "px";
            }
            this.container.appendChild(div);
        }
    }

    VarietyAlbum.prototype.bindScroll = function(){
        switch(this.opts.layout){
            case 3:
            window.onscroll = function () {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (scrollTop + document.documentElement.clientHeight >= document.documentElement.offsetHeight-2) {
                    this.renderBarrel(); //循环显示所设置的个数
                }
            }.bind(this)
            break;
            case 2:
            window.onscroll = function() {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (scrollTop + document.documentElement.clientHeight >= document.documentElement.offsetHeight-2) {
                    this.appendOne();//下拉触发一次，添加3张照片
                    this.appendOne();
                    this.appendOne();
                }
            }.bind(this)
            break;
            default:
            break;
        }
    }

    //开始拼图布局
    VarietyAlbum.prototype.puzzleInit = function(){
        this.setImage();
        this.renderPuzzle(this.opts.picsNum.toString());
        this.bindEvent(this.opts.addDom);
        this.puzzleScroll();
    }

    VarietyAlbum.prototype.puzzleScroll = function(){//取消之前的scroll绑定
        window.onscroll = function(){return}
    }

    VarietyAlbum.prototype.renderPuzzle = function(num){
        setTimeout(function(){
            if(this.image===undefined){
                setTimeout(arguments.callee,500);
            }else{
                if(this.opts.currentNum==this.opts.loadNumber){
                    this.opts.currentNum=0;//如果超过了初次渲染的图片就从头读取
                }
                var div = document.createElement('div');
                div.className = "album";
                switch(num){
                    case '1':
                    var html = "<div class='album1'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    case '2':
                    var html="<div class='album2'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    case '3':
                    var html = "<div class='album3-left'><img src='"+this.image[this.opts.currentNum++].src+"'></div><div class='album3-right'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    case '4':
                    var html= "<div class='album4-left'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div><div class='album4-right'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    case '5':
                    var html = "<div class='album5-left'><div class='album5-left-top'><img src='"+this.image[this.opts.currentNum++].src+"'></div><div class='album5-left-bottom'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div></div><div class='album5-right'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    case '6':
                    var html = "<div class='album6-left'><div class='album6-left-top'><img src='"+this.image[this.opts.currentNum++].src+"'></div><div class='album6-left-bottom'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div></div><div class='album6-right'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'><img src='"+this.image[this.opts.currentNum++].src+"'></div>";
                    break;
                    default:
                    console.log("type erorr");
                    break;
                }
                div.innerHTML = html;
                this.container.appendChild(div);

                this.setImgClass();
            }
        }.bind(this),500);
    }

    VarietyAlbum.prototype.bindEvent = function(dom){//注意这里之前用addEventListener会重复添加事件，建议别用DOM2的事件
        dom.onclick = function(){
            this.opts.picsNum = document.getElementById('puzzleLayout').value.toString();
            this.renderPuzzle(this.opts.picsNum);
        }.bind(this)
    }


    //瀑布流布局
    VarietyAlbum.prototype.waterfallInit = function(){
        this.initDom();
        this.bindScroll();
        this.setImgClass();
    }
    VarietyAlbum.prototype.initDom = function(){
        var column_html = "";
        for (var i = 0; i < this.opts.column; i++) {
            column_html += "<div id='wfcolumn" + i + "' ><div><img src='" + this.image[this.opts.imgNumber].src + "' style></div></div>";
            this.opts.imgNumber++;
        }
        this.container.innerHTML = column_html;
        this.appendOne();
        this.appendOne();
        this.appendOne();
        this.appendOne();
    }
    VarietyAlbum.prototype.setImgClass = function(){//给每个IMG添加样式
        var img_arr = this.container.getElementsByTagName("img");
        var self = this;
        switch(this.opts.layout){
            case 1:
            break;
            case 2:
            for (var i = 0; i < img_arr.length; i++) {
                // img_arr[i].onclick = function(){
                //     self.zoom();
                // }
                // img_arr[i].setAttribute("title", "点击放大");
                img_arr[i].setAttribute("class", "wf-imgs");
            }
            break;
            case 3:
            break;
            default:
            break;
        }
    }

    VarietyAlbum.prototype.appendOne = function(){//添加一个
        var temp_arr = [];

        for (var i = 0; i < this.opts.column; i++) { //把每栏最后一个子节点的offsetTop拿出来
            var name = "wfcolumn" + i;
            temp_arr.push(document.getElementById(name).lastChild.offsetTop);
        }

        var min = temp_arr[0];
        for (var x = 1; x < temp_arr.length; x++) {
            if (min > temp_arr[x]) {
                min = temp_arr[x]
            };
        }

        for (var i = 0; i < this.opts.column; i++) {
            var name = "wfcolumn" + i;
            if (document.getElementById(name).lastChild.offsetTop == min) {
                this.appendDom(document.getElementById(name));
            }
        }

    }
    VarietyAlbum.prototype.isReachBtm = function(){//判断是否可以滚动
        if(document.documentElement.clientHeight < document.documentElement.offsetHeight-4){
            return true
        }else{
            return false
        }
    }
    VarietyAlbum.prototype.appendDom = function(column){
        if(this.opts.imgNumber>=this.opts.loadNumber){this.opts.imgNumber=0}
        if(this.image!==undefined)
        
        var img = new Image(),
        div = document.createElement("div");

        img.src = this.image[this.opts.imgNumber++].src;
        div.appendChild(img);
        column.appendChild(div);

        this.setImgClass();
    }
    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    VarietyAlbum.prototype.getImageDomElements = function() {
        
    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    VarietyAlbum.prototype.addImage = function (image) {

    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    VarietyAlbum.prototype.removeImage = function (image) {

    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，VarietyAlbum.LAYOUT 中的值
     */
    VarietyAlbum.prototype.setLayout = function (layout) {

    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    VarietyAlbum.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    VarietyAlbum.prototype.enableFullscreen = function () {

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    VarietyAlbum.prototype.disableFullscreen = function () {

    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    VarietyAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    VarietyAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    VarietyAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    VarietyAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    VarietyAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    VarietyAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    VarietyAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口
    VarietyAlbum.prototype.getPuzzleNum = function(){

    }


    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.myAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.myAlbum = new VarietyAlbum();
    }

}(window));

var myAlbum = myAlbum.init(document.getElementById('container'));
var opts = { 
    layout:1,
    picsNum:document.getElementById('puzzleLayout').value,
    currentNum:0,
    loadNumber:50,
    addDom:document.getElementById('add')
};
myAlbum.setOption(opts);

document.getElementById('selectLayout').onchange = function(){
    document.getElementById('container').innerHTML = "";
    switch(this.value){
        case "1":
        document.getElementById('wrap').setAttribute('class','show');
        var opts = { 
            layout:1,
            picsNum:document.getElementById('puzzleLayout').value,
            currentNum:0,
            loadNumber:30,
            addDom:document.getElementById('add')
        };
        break;
        case "2":
        var opts = {
            layout:2,
            imgNumber: 0, //每张图的编号
            column: 5, //瀑布栏数，基于我取的照片，6栏最美好。
            loadNumber:10//初始图片数量
        };
        document.getElementById('wrap').setAttribute('class','hide');
        break;
        case "3":
        var opts = {
            layout:3,
            rows:[],
            barrelHeight:300,
            loadNumber:30//初始图片数量
        };
        document.getElementById('wrap').setAttribute('class','hide');
        break;
        default:
        break;
    }
    myAlbum.setOption(opts);
}
// myAlbum.setOption(opts);
// var opts = { 木桶布局的参数
//     layout:3,
//     rows:[],
//     barrelHeight:300,
//     loadNumber:50//初始图片数量
// };
// 
// var opts = { 拼图布局的参数
//     layout:1,
//     picsNum:document.getElementById('puzzleLayout').value,
//     currentNum:0,
//     loadNumber:50,
//     addDom:document.getElementById('add')
// };