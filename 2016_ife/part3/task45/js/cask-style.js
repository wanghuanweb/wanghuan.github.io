var cask = {
    container: document.getElementById("cask_container"),
    src: "http://cued.xunlei.com/demos/publ/img/P_",
    imgNumber: 0, //每张图的编号
    imgs: [], //图片数组
    loadNumber: 30, //初始水桶数
    height: 300, //水桶的高度
    rows: [],
    getIndex: function() {
        var index = this.imgNumber;
        if (index < 10) {
            index = "00" + index;
        } else if (index < 100) {
            index = "0" + index;
        }
        return index;
    },
    getImage: function() {
        var self = this,
            i = 0,
            timer = 0;

        function imgIntrvl() {
            index = self.getIndex();
            img = document.createElement("img");
            img.src = self.src + index + ".jpg";
            if (img.width > 0 && img.height > 0) {
                self.imgs.push({
                    width: img.width,
                    height: img.height,
                    src: self.src + index + ".jpg",
                    ratio: img.width / img.height,
                });
                self.imgNumber++;
                i++;
                if (i > self.loadNumber) {
                    cask.imgNumber = 0;
                    clearInterval(setImg);
                    timer = 1;
                }
                if (timer == 1) {
                    self.getRatioWidth();
                }
            }
        }
        var setImg = setInterval(imgIntrvl, 0);
    },
    getRatioWidth: function() {
        var self = this,
            imgsWidth = 0,
            tempArr = []; //暂存每一行的照片

        for (var i = 0; i < self.imgs.length; i++) {
            img = new Image();
            img.src = self.imgs[i].src;

            self.imgs[i].width = self.imgs[i].ratio * self.height; //转换每张图片的宽
            imgsWidth += self.imgs[i].width;
            tempArr.push(self.imgs[i]);
            if (imgsWidth > self.container.clientWidth) {
                self.rows.push(tempArr);
                self.rows.push(self.height * (self.container.clientWidth / imgsWidth));
                imgsWidth = 0;
                tempArr = [];
            }
        }
        self.render();
    },
    render: function() {
        var self = this,
            index;

        for (var i = 0; i < self.rows.length; i += 2) {
            var div = document.createElement("div");
            for (var j = 0; j < self.rows[i].length; j++) {
                var img = new Image();
                img.src = self.rows[i][j].src;
                div.appendChild(img);
                index = i + 1;
                div.style.height = self.rows[index] + "px";
            }
            self.container.appendChild(div);
        }
    },
    scroll: function() {
        var self = this;
        window.onscroll = function() {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (scrollTop + document.documentElement.clientHeight >= document.documentElement.offsetHeight-2) {
                self.render(); //循环显示所设置的个数
            }
        }
    },

    init: function() {
        document.getElementById("cask_container").style.width = document.documentElement.clientWidth - 30 + "px";
        isReady();
        this.getImage();
        this.scroll();
    }
}
window.onload = function() {
    cask.init();
}
window.onresize = function() {
    location.reload()
}
function isReady(){
    var content = document.getElementById("cask_container");
    if(content.childNodes.length==0){
        var timeout = setTimeout(isReady,1000);
    }else{
        document.getElementsByClassName("mask")[0].style.display = "none";
        clearTimeout(timeout);
    }
}
