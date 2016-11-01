var x = 10;
foo();

function foo() {

  var x = 20;
  var y = 30;

  var bar = new Function('console.log(x); console.log(y);');

  bar(); // 10, "y" 未定义

}
