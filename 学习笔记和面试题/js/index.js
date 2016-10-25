var point = {
 x : 0,
 y : 0,
 moveTo : function(x, y) {
     // 内部函数
     var that = this;
     var moveX = function(x) {
     that.x = x;//that 绑定到了外部函数的对象上
    };
    // 内部函数
    var moveY = function(y) {
    that.y = y;//that 绑定到了外部函数的对象上
    };

    moveX(x);
    moveY(y);
    }
 };
 point.moveTo(1, 1);
 console.log(point.x); //==>0
 console.log(point.y); //==>0
 console.log(x); //==>x is not defined
 console.log(y); //==>y is not defined
