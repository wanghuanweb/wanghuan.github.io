/**
 * 拖动元素dragElement
 *     事件:dragstart,drag,dragend
 *     事件拖动对象dataTransfer，属性有getData(),setData()
 * 放置元素dropElement
 *     事件:dragenter,dragover,dragleave(drop)
 *
 *
 * 拖放元素的写法：
 * 1.拖放元素中draggable=true表示可拖拽，添加dragstart事件且event.dataTransfer.setData()
 * 放置元素的写法：
 * 1.重写dragenter，dragover写法，drop取消默认行为，因为默认是不发生drop事件
 * 2.在drop事件中，getData且append
 */

window.onload = function(){
    var dragEle = document.getElementsByClassName("dragElement")[0],
        dropEle = document.getElementsByClassName("dropElements")[0],
        dropEle2 = document.getElementsByClassName("dropElements")[1];


    dragEle.addEventListener("dragstart",function(event){
        console.log(event.target.id);
        event.dataTransfer.setData("text",event.target.id);
    },false);

    dropEle.addEventListener("dragenter",function(event){
        event.preventDefault();
    },false);
    dropEle2.addEventListener("dragenter",function(event){
        event.preventDefault();
    },false);
    dropEle.addEventListener("dragover",function(event){
        event.preventDefault();
    },false);
    dropEle2.addEventListener("dragover",function(event){
        event.preventDefault();
    },false);

    dropEle.addEventListener("drop",function(event){
        console.log("w");
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    },false);
    dropEle2.addEventListener("drop",function(event){
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    },false);

};
