(function () {

    var drawing = document.getElementById('drawing'),
        context = drawing.getContext("2d"),
        mousePos = [],
        nodes = [],
        edges = [],
        i = 0;

    // 确保不重复的添加边
    function addOneEdge(edge) {
        var flag = false;

        edges.forEach(function(item){
            if(edge.from === item.from && edge.to === item.to){
                flag = true;
            }

            if (item.to == edge.from && item.from == edge.to) {
              flag = true;
            }
        });

        if(!flag) {
            edges.push(edge);
        }
    }


    // 添加节点和边
    function addNodesEdges() {

        var node,
            edge;
        // 新建node添加到nodes数组中
        for(; i < 150; i++) {
            node = {
                x: Math.random() * drawing.width,
                y: Math.random() * drawing.height,

            };
            nodes.push(node);
        }
        // 新建edge添加到edges数组中
        nodes.forEach(function(item1) {
            nodes.forEach(function(item2) {
                if(item1 === item2) {
                    return;
                }

                edge = {
                    from:item1,
                    to:item2
                };
            });
            addOneEdge(edge);
        });
    }

    function anima() {
        nodes.forEach(function(item) {
            
        });
    }

    // 浏览器窗口改变时，重新绘制星空
    window.onresize = function() {
        if(drawing.getContext) {
            drawing.width = document.body.clientWidth;
            drawing.height = document.body.clientHeight;
        }

        if(nodes.length === 0) {
            addNodesEdges();
        }

    };
    // 随时改变鼠标的位置
    window.onmousemove = function(e) {
        mousePos[0] = e.clientX;
        mousePos[1] = e.cclientY;
    };

    window.onresize();
    // 浏览器的一个定时动画
    window.requestAnimationFrame(anima);

}).call(this);
