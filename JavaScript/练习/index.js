function Animal(){
	this.species = "动物";
}

function Cat(name,color){
	this.name = name;
	this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物

var Chinese = {
　　　　nation:'中国'
　　};
var Doctor ={
　　　　career:'医生'
　　};
function extendCopy(p) {

　　　　var c = {};

　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　}

　　　　c.uber = p;

　　　　return c;
　　}
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国
