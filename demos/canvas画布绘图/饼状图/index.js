PieChart.prototype.draw = function(){
    var x = this.canvas.width/2,
        y = this.canvas.height/2,
        len = this.array.length,
        arrayTotal = 0,
        arraySubTotal = 0,
        i;
    // 计算所以数据的和
    for(i = 0;i < len;i++) {
        arrayTotal += this.array[i];
    }
    console.log(arrayTotal);
    console.log(x);
    console.log(y);
    //
    for(i = 0;i < len;i++) {
        // 平滑获得每个部分的颜色
        var red = Math.round(this.startColor[0] - ((this.startColor[0] - this.endColor[0])/(len - 1))*i),
            green = Math.round(this.startColor[1] - ((this.startColor[1] - this.endColor[1])/(len - 1))*i),
            blue = Math.round(this.startColor[2] - ((this.startColor[2] - this.endColor[2])/(len - 1))*i);

        this.context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        // 绘制饼状图每个部分
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.context.arc(x,y,this.radius,arraySubTotal / arrayTotal * Math.PI * 2,
                                         (arraySubTotal+this.array[i]) / arrayTotal * Math.PI * 2,false);
        this.context.closePath();
        this.context.fill();

        this.context.beginPath();
        this.context.moveTo(x,y);
        this.context.arc(x,y,this.radius,arraySubTotal / arrayTotal * Math.PI * 2,
                                         (arraySubTotal+this.array[i]) / arrayTotal * Math.PI * 2,false);
        // 绘制片段时，从中心直接跳到绘制片段的外边弧，则自动连接第一点和弧的起点，所以只需要对最后一个片段的最后一条边使用closePath即可
        if(i == len - 1) {
            this.context.closePath();
        }
        this.context.stroke();

        arraySubTotal += this.array[i];
    }
    // 给饼状图添加阴影部分
    this.context.beginPath();
    this.context.moveTo(x+this.shadowOffset,y+this.shadowOffset);
    this.context.arc(x+this.shadowOffset,y+this.shadowOffset,this.radius,0,Math.PI*2,false);
    this.context.closePath();
    // 在填充形状之前，改变了图形组合的方式，则此属性是新绘制图形在已有图形下面（ps：默认是source-over是默认新绘制图形在上面）
    this.context.globalCompositeOperation = "destination-over";
    this.context.fillStyle = "rgba(0,0,0,0.25)";
    this.context.fill();
};
function PieChart(array,radius){
    this.array = array;
    this.radius = radius;
    // 设置起始和结束颜色，从而可以让饼状图颜色过渡较好
    this.startColor = [190,13,13];
    this.endColor = [70,12,243];

    this.canvas = document.getElementById('drawing');

    if(this.canvas.getContext) {
        this.context = this.canvas.getContext("2d");
        this.shadowOffset = 7;
        this.draw();
    }
}

init();
function init(){
    var a = [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],
        pieChart = new PieChart(a,100);
}
