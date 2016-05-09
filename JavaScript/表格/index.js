/**
 * table元素的属性和方法
 * **************************
 * **************************
 * caption:保存着对<caption>元素的指针
 * tHead：保存着对<thead>元素的指针
 * tBodies：是一个<tbody>元素的HTMLCollection
 * rows：是一个表格中所有行的HTMLCollection
 * tFoot:保存着对<tfoot>元素的指针
 * ********************
 * createCaption()
 * createtHead()
 * insertRow(pos)
 * createtFoot()
 * *********************
 * deleteCaption()
 * deletetHead()
 * deleteRow(pos)
 * deletetFoot()
 * tbody元素的属性和方法
 * *************************
 * *************************
 * rows
 * insertRow(pos)
 * deleteRow(pos)
 * tr元素的属性和方法
 * *************************
 * *************************
 * cells()是一个<tr>元素的HTMLCollection
 * deleteCell(pos)
 * insertCell(pos)
 */
var datas = [
    {
    	name: '小明',
    	chinese: 80,
    	math: 90,
    	english: 70,
    	total: 240
    },
    {
    	name: '小红',
    	chinese: 90,
    	math: 60,
    	english: 90,
    	total: 240
    },
    {
    	name: '小亮',
    	chinese: 60,
    	math: 100,
    	english: 70,
    	total: 230
    }
];

function creatTable() {//根据数据生成table
    var table = document.getElementsByTagName("table")[0],
        i;

    if (table.childNodes.length > 2) {//清空table
     for (i = 0; i < table.childNodes.length; i++) {
       table.removeChild(table.childNodes[2]);
     }
}

for (i = 0; i < datas.length; i++) {//将数据添加到table
     table.insertRow(i+1);

     table.rows[i+1].insertCell(0);
     table.rows[i+1].cells[0].innerHTML = datas[i].name;
     table.rows[i+1].insertCell(1);
     table.rows[i+1].cells[1].innerHTML = datas[i].chinese;
     table.rows[i+1].insertCell(2);
     table.rows[i+1].cells[2].innerHTML = datas[i].math;
     table.rows[i+1].insertCell(3);
     table.rows[i+1].cells[3].innerHTML = datas[i].english;
     table.rows[i+1].insertCell(4);
     table.rows[i+1].cells[4].innerHTML = datas[i].total;
}
}


function asc(id) {//升序排序
    var temp,
        i,
        j;
    if (id == "Chinese") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].chinese > datas[j].chinese) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "Math") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].math > datas[j].math) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "English") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].english > datas[j].english) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "Total") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].total > datas[j].total) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    creatTable();
    }


    function des(id) {//降序排序
     var temp,
         i,
         j;
    if (id == "Chinese") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].chinese < datas[j].chinese) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "Math") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].math < datas[j].math) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "English") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].english < datas[j].english) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    else if (id == "Total") {
     for (i = 0; i < datas.length; i++) {
       for (j = i+1; j < datas.length; j++) {
         if(datas[i].total < datas[j].total) {
           temp = datas[i];
           datas[i] = datas[j];
           datas[j] = temp;
         }
       }
     }
    }
    creatTable();
}

function init() {//初始化，绑定click事件
    document.getElementsByClassName("asc")[0].onclick=function(){asc("Chinese")};
    document.getElementsByClassName("des")[0].onclick=function(){des("Chinese")};
    document.getElementsByClassName("asc")[1].onclick=function(){asc("Math")};
    document.getElementsByClassName("des")[1].onclick=function(){des("Math")};
    document.getElementsByClassName("asc")[2].onclick=function(){asc("English")};
    document.getElementsByClassName("des")[2].onclick=function(){des("English")};
    document.getElementsByClassName("asc")[3].onclick=function(){asc("Total")};
    document.getElementsByClassName("des")[3].onclick=function(){des("Total")};
    creatTable();
}

init();
