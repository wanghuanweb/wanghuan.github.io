// 题目说明：
//ZigZag Conversion曲折转换，其实就是锯齿形的转换
//The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
// P   A   H   N
// A P L S I I G
// Y   I   R
//
// And then read line by line: "PAHNAPLSIIGYIR"
//
// Write the code that will take a string and make this conversion given a number of rows:
// string convert(string text, int nRows);
// convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {

    var len = s.length,
        string = [],
        array = s.split(""),
        i,
        j;

    if(numRows < 2){
        return s;
    }

    // 每行字符串拼接，则对每行遍历
    for(i = 0; i < numRows;i++) {
        // 所有行数字的间距是 2 * numRows - 2
        for(j = i; j < len; j += 2*numRows - 2) {
            string.push(array[j]);
            // 首行和尾行除外，其他行还会额外重复，距离是 2 * nRows - 2 - 2 * i
            if(i > 0 && i < numRows - 1) {
                if( (j + 2*numRows - 2 - 2*i) < len) {
                    string.push(array[j + 2*numRows - 2 - 2*i]);
                }
            }
        }
    }

    string = string.join("");
    return string;
};
