// 题目说明：
// For example:
//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28

// 思路：其实就是特殊的26进制转换成10进制
// 需要注意的就是要将A变成整数1的时候的转换，用charCodeAt，而不是charAt

/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {

    var len = s.length,
        i = 0,
        total = 0;
    for(;i < len;i++) {
        // 用charAt不可行，为NAN
        total = total*26 + (s.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }

    return total;

};

titleToNumber("AA");
