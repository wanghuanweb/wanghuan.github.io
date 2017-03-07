// 写一个traverse函数，输出所有页面宽度和高度大于50像素的节点。
// 要特别注意||document.body和||0的严格性 ,还有判断length是否大于0

function traverse(oNode){
    oNode = oNode || document.body;
    var result = [];

    if(oNode.style){
        var width = parseInt(oNode.style.width,10) || 0,
            height = parseInt(oNode.style.heigth,10) || 0;

        if(width > 50 && height > 50){
            result.push(oNode);
        }
    }

    var child = oNode.childNodes,
        len = child.length;
    if(len > 0){
        for(var i = 0;i < len;i++) {
            result.concat(traverse(child[i]));
        }
    }
    return result;
}
