function TableTool(param,id) {
    this.data = param;
    this.init(id);
};

TableTool.prototype = {
    init:function(id){
        this.createTable(id);
        this.bindSort();
        this.isFrozen();
    },
    createTable: function(id) {
        var table = document.createElement("table");
        table.setAttribute("id", this.data.table_name);

        table.style.textAlign = "center";
        table.style.backgroundColor = this.data.table_color;
        table.style.borderCollapse = "collapse";

        var thead = document.createElement("thead");
        thead.style.backgroundColor = this.data.head_color; //标题行背景色

        var table_html = "",
            tempHTML = "";
        for (var i = 0; i < this.data.table_head.length; i++) {
            //借鉴http://sakitama.github.io所采取的方式，用符号代替图片的箭头
            if (this.data.isSort[i] == "1") {
                tempHTML = "</p><span data-index='1' class='asc'>↑</span>&nbsp<span data-index='1' class='des'>↓</span</td>"; //标记递增为asc；递减des
            } else {
                tempHTML = "</p><span data-index='0'></span>&nbsp<span data-index='0'></span</td>";
            }
            table_html += "<td name='" + this.data.table_head[i] + "' style='width:"+this.data.tdWH[0]+"px;height:"+this.data.tdWH[1]+"px'><p>" + this.data.table_head[i] + tempHTML;
        }

        thead.innerHTML = table_html;
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tbody_html = "";

        for (var i in this.data.tbody_obj) {
            for (var j = 0; j < this.data.table_head.length; j++) {
                tbody_html += "<td style='width:"+this.data.tdWH[0]+"px;height:"+this.data.tdWH[1]+"px'>" + this.data.tbody_obj[i][j] + "</td>";
            }
            tbody_html = tbody_html + "</tr>";
        }

        tbody.innerHTML = tbody_html;
        table.appendChild(tbody);
        console.log(id)

        if(id === undefined){
            var div = document.createElement('div');
            div.appendChild(table);
            document.body.appendChild(div);
        }else{
            document.getElementById(id).appendChild(table);
        }

        this.bindSort();
    },
    bindSort:function(){
        var span_newarr = new Array();
        var span_arr = document.getElementById(this.data.table_name).getElementsByTagName("span");
        for (var i = 0; i < span_arr.length; i++) {
            span_newarr.push(span_arr[i])
        }
        var that = this;
        span_newarr.forEach(function(item){
            item.style.cursor = "pointer";
            item.addEventListener("click", function() {
                if (this.getAttribute("class") == "asc") {
                    for (x in that.data.table_head) {
                        if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
                            that.sortUp(x);
                        }
                    }
                } else {
                    for (x in that.data.table_head) {
                        if (this.parentNode.getAttribute("name").toUpperCase() == that.data.table_head[x].toUpperCase()) {
                            that.sortDown(x);
                        }
                    }
                }
                that.isFrozen();
            }, false)
        })
    },
    updateTbody:function(){
        var tbody = document.createElement("tbody");
        var tbody_html = "";

        for (var i in this.data.tbody_obj) {
            for (var j = 0; j < this.data.table_head.length; j++) {
                tbody_html += "<td style='width:"+this.data.tdWH[0]+"px;height:"+this.data.tdWH[1]+"px'>" + this.data.tbody_obj[i][j] + "</td>";
            }
            tbody_html = tbody_html + "</tr>";
        }

        tbody.innerHTML = tbody_html;
        document.getElementById(this.data.table_name).removeChild(document.getElementById(this.data.table_name).lastElementChild);
        document.getElementById(this.data.table_name).appendChild(tbody);
        
    },
    sortUp: function(index) { //引入一个newArr和newObj先来处理排序，index指代的是要排序科目在数组中的位置
        var sortData = this.data.tbody_obj,
            newArr = [],
            newObj = {};
        for (key in sortData) {
            newArr.push(sortData[key]);
        }

        newArr.sort(function(a, b) {
            return a[index] - b[index];
        });

        for (var i = 0; i < newArr.length; i++) {
            newObj[i + 1] = newArr[i];
        }
        this.data.tbody_obj = newObj;
        this.updateTbody();
    },
    sortDown: function(index) { //引入一个newArr和newObj先来处理排序，index指代的是要排序科目在数组中的位置
        var sortData = this.data.tbody_obj,
            newArr = [],
            newObj = {};
        for (key in sortData) {
            newArr.push(sortData[key]);
        }

        newArr.sort(function(a, b) {
            return b[index] - a[index];
        });

        for (var i = 0; i < newArr.length; i++) {
            newObj[i + 1] = newArr[i];
        }
        this.data.tbody_obj = newObj;
        this.updateTbody();
    },
    isFrozen: function() {
        switch (this.data.isFrozen) {
            case 0:
                break;
            case 1:
                var tableChoose = document.getElementById(this.data.table_name);
                var firstTr = tableChoose.childNodes[0];
                var tdh = this.data.tdWH[1];
                var tdw = this.data.tdWH[0];
                var that = this;
                window.addEventListener("scroll", function() {
                    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                    if ((scrolltop < tableChoose.offsetTop + tableChoose.clientHeight) && (scrolltop > tableChoose.offsetTop)) {
                        firstTr.style.position = "fixed";
                        firstTr.style.top = 0;
                    } else {
                        firstTr.style.position = "inherit";
                    }
                }, false)
                break;
            default:
                alert("isFrozen参数错误，对应首航冻结默认无冻结。");
                break;
        }
    }
}
