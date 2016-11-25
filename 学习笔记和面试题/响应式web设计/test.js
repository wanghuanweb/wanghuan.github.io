(function() {
    var drawing = document.getElementById("drawing");

    if (drawing.getContext) {
        var context = drawing.getContext("2d");

        //注意这部分代码必须在font和fillText之前，不然文本会无阴影
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 2;
        context.shadowColor = "rgba(0,0,0,0.5)";

        context.font = "20px Times New Roman";
        context.fillStyle = "#666";
        context.fillText("This is the Canvas",5,30);

        context.fillStyle = "#ffffff";
        console.log("w");
    }
})();
