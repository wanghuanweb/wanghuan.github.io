// 题目说明：
// Reverse digits of an integer.
// Example1: x = 123, return 321
// Example2: x = -123, return -321


/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var string = x.toString(),
        array = string.split(""),
        len = array.length,
        i = len - 1,
        array2 = [],
        string2,
        num;

    for(;i >= 0 ;i--) {
        array2.push(array[i]);
    }

    string2 = array2.join("");
    num = parseInt(string2);
};
