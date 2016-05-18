/**
 * @param {number} num
 * @return {number}
 * 本题若想直接用length属性得到位数
 * 则本题目需要注意数字和字符串之间的转换
 */

 var addDigits = function(num) {
     var addNum = num,
        // 要用length属性，强制转换成字符串
         string = addNum.toString();

      while(string.length >= 2) {
          var temp = 0,
              length = string.length,
              i;
          for(i = 0;i < length;i++) {
             // 每位上的数转换成整数相加
              temp += parseInt(string.charAt(i));
          }
          string = temp;
         // 要用length属性，强制转换成字符串
          string = string.toString();
      }
     // 转换成整数返回
      string = parseInt(string);
      return string;
 };

init();

function init() {
    addDigits(10);
}
