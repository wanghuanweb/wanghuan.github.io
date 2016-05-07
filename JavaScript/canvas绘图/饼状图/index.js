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
        if(i == len - 1) {
            this.context.closePath();
        }
        this.context.stroke();

        arraySubTotal += this.array[i];
    }
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
        this.draw();
    }
}

init();
function init(){
    var a = [2,4,1,5,6,8,10],
        pieChart = new PieChart(a,100);
}
