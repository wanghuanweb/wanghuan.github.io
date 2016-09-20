function getqua(){
    var m = document.getElementById("aqi-input");
    var n = document.getElementById("aqi-display");
    // console.log(parseInt(true));
    // console.log(parseInt("true"));

    console.log(Number("hello CSSer!"));//NaN
    console.log(Number("0×8"));//NaN--无效的十六进制
    console.log(Number("0xf"));//15--有效的十六进制
    console.log(Number(""));//0
    console.log(Number("020dd"));//NaN
    console.log(Number("070"));//70--只包含数字，忽略前导0
    console.log(Number(true));//1


    n.innerHTML = m.value;
}
