init();

function init() {
  var depModify = new DepModify(),
      table1 = document.getElementById('otherDepTable'),
      table2 = document.getElementById('belongDepTable'),
      addButton = document.getElementById('addButton'),
      delButton = document.getElementById('delButton');

  for(var i = 0;i< depModify.deps.length;i++) {
    var tr1 = document.createElement("tr");
    tr1.innerHTML = depModify.deps[i];
    depModify.otherDep.appendChild(tr1);
  }

  addButton.addEventListener("click",function() {
    if(depModify.belongDep.children.length > 0){
        alert("最多选一个部门");
        return;
    }
    depModify.otherDepDel();
    depModify.targetNode.style.height = "30px";
    if(depModify.targetNode !== depModify.otherDep){
        depModify.belongDep.appendChild(depModify.targetNode);
    }

  });

  delButton.addEventListener("click",function() {
    depModify.belongDepDel();
    depModify.targetNode2.style.height = "30px";
    if(depModify.targetNode2 !== depModify.belongDep){
        depModify.otherDep.appendChild(depModify.targetNode2);
    }
  });

  table1.addEventListener("click",function(event) {
    depModify.targetNode = event.target;
    if(event.target !== depModify.belongDep){
        event.target.style.background = "#99ccdd";
    }
  });

  table2.addEventListener("click",function(event) {
    depModify.targetNode2 = event.target;
    // if(event.target !== depModify.otherDep){
    //     event.target.style.background = "#99ccdd";
    // }
  });

}

function DepModify() {
  this.deps = ["研发部","产品部","客服部","市场部","售后部","销售部","交互部","研发部","产品部","客服部","市场部","售后部","销售部","交互部","研发部","产品部","客服部","市场部","售后部","销售部","交互部"];
  this.belongDeps = [];
  this.otherDep =  document.getElementById('otherDepTable');
  this.len = otherDep.children[1].children.length;
  this.belongDep =  document.getElementById('belongDepTable');
  this.targetNode = this.otherDep;
  this.targetNode2 = this.belongDep;
}

DepModify.prototype.otherDepDel = function() {
	  if(this.targetNode && this.targetNode == this.otherDep) {
	    alert("please choose a dep");

	    return;
	  }else{
		this.len--;
	    this.targetNode.parentNode.removeChild(this.targetNode);
	    // for(var i = 0;i < this.len;i++) {
	    // 	if(i%2 === 0){
	    // 		this.otherDep.children[1].children[i].style = "#CCCCCC";
	    // 	}
	    // }
	  }
	};

DepModify.prototype.belongDepDel = function() {
	  if(this.targetNode2 && this.targetNode2 == this.belongDep) {
	    alert("please choose a dep");
	    return;
	  }else{
	    this.targetNode2.parentNode.removeChild(this.targetNode2);
	  }
	};
