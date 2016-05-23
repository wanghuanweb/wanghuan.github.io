(function () {

    var drawing = document.getElementById('drawing'),
        context = drawing.getContext("2d"),
        backgroundColor = '#000',
        nodeColor = '#fff',
        edgeColor = '#fff',
        mousePos = [0,0],
        nodes = [],
        edges = [];

    // 确保不重复的添加边
    function addOneEdge(edge) {
        var flag = false;

        edges.forEach(function(item){
            if(edge.from === item.from && edge.to === item.to){
                flag = true;
            }

            if (item.to === edge.from && item.from === edge.to) {
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
            edge,
            i;
        // 新建node添加到nodes数组中
        for(i = 0; i < 90; i++) {
            node = {
                drivenByMouse: i === 0,
                x: Math.random() * drawing.width,
                y: Math.random() * drawing.height,
                ex:Math.random() * 1 - 0.5,
                ey:Math.random() * 1 - 0.5,
                radius:Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3

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

                addOneEdge(edge);
            });

        });
    }

    // 将nodes[0]也就是鼠标节点特殊处理
    function adjustMouseNode() {
        nodes[0].x += (mousePos[0] - nodes[0].x) / 5.0;
        nodes[0].y += (mousePos[1] - nodes[0].y) / 5.0;
    }


    // 改变星际轨迹
    function anima() {
        nodes.forEach(function(item) {
            if(item.drivenByMouse) {
                return;
            }

            item.x += item.ex;
            item.y += item.ey;

            function compare(min,max,x) {
                if(x < min) {
                    return min;
                } else if(x > max) {
                    return max;
                } else {
                    return x;
                }
            }

            // 在边上特殊处理，将ex变成负数，即回弹
            if(item.x <= 0 || item.x >= drawing.width) {
                item.ex *= -1;
                item.x = compare(0,drawing.width,item.x);
            }
            if(item.y <= 0 || item.y >= drawing.height) {
                item.ey *= -1;
                item.y = compare(0,drawing.height,item.y);
            }
        });
        // 将nodes[0]也就是鼠标节点特殊处理
        adjustMouseNode();
        // 改变了每个节点之后，及时绘制出来
        render();
        // 在进行下一个动画
        window.requestAnimationFrame(anima);
    }

    /**
     * 用canvas绘制
     * 1.确定背景颜色为黑色
     * 2.画出edges数组中的所有线，算出长度，越短则宽度越大，透明度越低,长度超过threshold时不显示
     * 3.画出nodes数组中的所有点，
     */
    function render() {
        var threshold,
            length;
        // 确定背景颜色
        context.fillStyle = backgroundColor;
        context.fillRect(0,0,drawing.width,drawing.height);
        // 画出edges
        edges.forEach(function(item) {
            length = Math.sqrt(Math.pow((item.from.x - item.to.x),2) + Math.pow((item.from.y - item.to.y),2));
            threshold = drawing.width / 8;

            if(length > threshold) {
                return;
            }
            // 先写样式，在beginPath,划线，最后用stroke和fill描绘
            context.strokeStyle = edgeColor;
            context.lineWidth = (1.0 - length / threshold) * 2.5;
            context.globalAlpha = 1.0 - length / threshold;

            context.beginPath();
            context.moveTo(item.from.x,item.from.y);
            context.lineTo(item.to.x,item.to.y);

            context.stroke();
        });
        context.globalAlpha = 1.0;
        // 画出nodes
        nodes.forEach(function(item) {
            if (item.drivenByMouse) {
              return;
            }

            context.fillStyle = nodeColor;

            context.beginPath();
            context.arc(item.x,item.y,item.radius,0,2 * Math.PI);

            context.fill();
        });
    }


    // 浏览器窗口改变时，重新绘制星空
    window.onresize = function() {
        if(drawing.getContext) {
            //
            drawing.width = document.body.clientWidth;
            drawing.height = drawing.clientHeight;
        }

        if(nodes.length === 0) {
            addNodesEdges();
        }
        render();
    };


    // 随时改变鼠标的位置
    window.onmousemove = function(e) {
        mousePos[0] = e.clientX;
        mousePos[1] = e.clientY;
    };

    window.onresize();
    // 浏览器的一个定时动画
    window.requestAnimationFrame(anima);

}).call(this);
