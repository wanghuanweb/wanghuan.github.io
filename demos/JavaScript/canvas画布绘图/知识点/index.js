/**
 * 使用canvas画布绘图
 * canvas画布绘图的默认宽高为300px * 150px,在css中为canvas定义宽高，实际上把宽高为300px * 150px的画布进行了拉伸，
 * 如果在这样的情况下进行canvas绘图，你得到的图形可能就是变形的效果。
 * 所以，在canvas绘图时，应该在canvas标签里直接定义宽高。
 */

/**
 * 2D上下文绘图：
 * 填充和描边属性：fillStyle填充和strokeStyle描边------属性值可以是字符串、渐变对象或模式对象
 * 线宽lineWidth:context.lineWidth = value;
 * 1.矩形：矩阵是唯一一个可以直接在2D上下文绘制的图形，绘制矩形有关的方法：
 * 		fillRect()
 * 		strokeRect()
 * 		clearRect()
 * 		三个方法接收4个参数：矩形x坐标，矩形y坐标，矩形宽度和矩形高度
 * 2.绘制路径：绘制路径之后用stroke(),fill()绘制图形
 *      绘制路径的方法：
 *      beginPath()--先调用此方法，才可绘制新的路径
 * 		arc(x,y,radius,startAngle,endAngle,counterclockwise)--x,y为圆心,radius为半径，startAngle和endAngle起始和结束角度，counterclockwise是否为逆时针方向
 * 		moveTo(x,y)--绘图游标移动到(x,y)不划线
 * 		lineTo(x,y)--从上一点绘制一条直线，到(x,y)结束
 * 		rect(x,y,width,heigth)--从(x,y)开始绘制矩形路径，而不是strokeRect()和fillRect()
 * 		stroke()--对路径描边
 * 		fill()--对路径填充
 * 3.绘制文本
 * 		fillText();--四个参数：要绘制的文本字符串，x坐标，y坐标，可选的最大像素宽度
 * 		strokeText();--四个参数：要绘制的文本字符串，x坐标，y坐标，可选的最大像素宽度
 * 		上述两个方法以以下三个属性为基础
 * 		font,textAlign,textBaseline
 * 4.变换
 * 		2D绘制上下文支持各种基本的绘图变换
 * 	 	rotate(angle)--围绕原点旋转图像angle弧度
 * 	 	scale(scaleX,scaleY)
 *    	translate(x,y)--将坐标原点移动到(x,y),即改变原点
 *     	transform()--
 * 	    setTransform()
 * 5.阴影:根据几个属性值画出阴影
 * 		shadowOffsetX --x轴偏移量
 * 		shadowOffsetY --y轴偏移量
 * 		shadowBlur --模糊的像素数
 * 		shadowColor --阴影的颜色
 * 6.渐变
 * 		渐变先调用createLinerGradient()--四个参数：起点的x坐标，y左边和终点的x，y坐标
 * 		创建了渐变对象后，用addColorStop()来指定色标
 */
init();

function init(){
    var drawing = document.getElementById('drawing'),
        drawing1 = document.getElementById('drawing1'),
        drawing2 = document.getElementById('drawing2'),
        drawing3 = document.getElementById('drawing3'),
        drawing4 = document.getElementById('drawing4');

    console.log(typeof drawing.getContext);
    // 确保浏览器支持<canvas>元素
    if(drawing.getContext) {
        var context = drawing.getContext("2d");
        // 绘制红色矩形
        context.fillStyle = "#ff0000";
        context.fillRect(0,0,50,50);
        // 绘制半透明的蓝色矩形
        context.fillStyle = "rgba(0,0,255,0.2)";
        context.fillRect(100,100,40,40);


        // 绘制红色矩形边框
        context.strokeStyle = "#ff0000";
        context.strokeRect(20,20,50,50);
        // 绘制半透明的蓝色矩形边框
        context.strokeStyle = "rgba(0,0,255,0.2)";
        context.strokeRect(60,60,40,40);
    }

    if(drawing1.getContext){
        var context1 = drawing1.getContext("2d");
        //绘制表盘
        //开始路径
        context1.beginPath();
        //绘制外圆
        context1.arc(100,100,99,0,2*Math.PI,false);
        // 绘制内圆
        context1.moveTo(194,100);
        context1.arc(100,100,94,0,2*Math.PI,false);
        //绘制分针
        context1.moveTo(100,100);
        context1.lineTo(100,15);
        //绘制时针
        context1.moveTo(100,100);
        context1.lineTo(25,100);
        context1.rect(100,100,10,10);//这也只是绘制路径，和strokeRect有本质的区别
        // 绘制文本
        context1.font = "bold 14px Arial";
        context1.textAlign = "center";
        context1.textBaseline = "middle";
        context1.fillText("12",100,20);
        //描边路径
        context1.strokeStyle = "#ff0000";
        context1.stroke();
    }

    if(drawing2.getContext){
        var context2 = drawing2.getContext("2d");
        //绘制表盘
        //开始路径
        context2.beginPath();
        //绘制外圆
        context2.arc(100,100,99,0,2*Math.PI,false);
        // 绘制内圆
        context2.moveTo(194,100);
        context2.arc(100,100,94,0,2*Math.PI,false);
        // 变换原点且旋转（注意旋转之后在写分时针）
        context2.translate(100,100);
        context2.rotate(1);
        //绘制分针
        context2.moveTo(0,0);
        context2.lineTo(0,-85);
        //绘制时针
        context2.moveTo(0,0);
        context2.lineTo(-75,0);
        //描边路径
        context2.strokeStyle = "#ff0000";
        context2.stroke();
    }

    if(drawing3.getContext){
        var context3 = drawing3.getContext("2d");
        // 阴影效果
        context3.shadowOffsetX = 5;
        context3.shadowOffsetY = 5;
        context3.shadowBlur = 4;
        context3.shadowColor = "rgba(0,0,0,0.5)";
        // 渐变效果
        // var gradient = context3.createLinerGradient(30,30,70,70);
        // gradient.addColorStop(0,"white");
        // gradient.addColorStop(1,"black");

        context3.fillStyle = "rgba(0,0,255,0.8)";
        context3.fillRect(30,30,50,50);
    }

    if(drawing4.getContext){
        var context4 = drawing4.getContext("2d");
        // 渐变效果
        var gradient = context4.createLinearGradient(30,30,70,70);
        gradient.addColorStop(0,"white");
        gradient.addColorStop(1,"black");
        context4.fillStyle = gradient;

        context4.fillRect(30,30,50,50);
        console.log(null instanceof Object);
        console.log(null instanceof Null);

        // context4.strokeStyle = gradient;
        // context4.strokeRect(30,30,50,50);
    }
}
