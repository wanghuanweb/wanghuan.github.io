function b(x, y, a) {
    alert(b.length);//3
    alert(arguments.length);//2
    arguments[2] = 10;
    alert(a); //undefined
    alert(arguments[2]);//10
}
b(1, 2);
