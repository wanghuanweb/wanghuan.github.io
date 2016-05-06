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
 function TableSort(id) {
     console.log("new tableSort");
     this.id = document.getElementById(id);
     if(this.id && this.id.nodeName == "TABLE") {
         console.log("run id");
         this.makeSort();
     }
 }

 TableSort.prototype.makeSort = function (){
     console.log("new tableSort makeSort");
     var headings = this.id.tHead.rows[0].cells,
         parent = this,
         i;
     for(i = 0;headings[i];i++) {
         var a = document.createElement("a");
         a.href = "#";
         a.innerHTML = headings[i].innerHTML;
         a.addEventListener("click",function(){
            parent.sortCol(this); 
         });
         headings[i].innerHTML = "";
         headings[i].appendChild(a);
     }
 };

 TableSort.prototype.sortCol = function() {

 };

init();

function init() {
    console.log("run init");
    var tableSort = new TableSort("tableScores");
    tableSort.makeSort();
}
