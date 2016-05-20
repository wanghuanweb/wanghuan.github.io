// 题目说明：
// Given an integer, write a function to determine if it is a power of three.
// 用递归和log两种方法


// 方法一：
/**
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfThree = function(n) {
     console.log(n);
     if(n === 1) {
         console.log("a");
         return true;
     } else if(n === 0){
         return false;
     } else if( n % 3 === 0){
        //  注意做的时候这里没加return，导致返回的是undefined
         return isPowerOfThree (n / 3);
     } else {
         return false;
     }
 };

 var x = isPowerOfThree(27);
 console.log(x);
// 方法一：
// 3^x=n
// log(3^x) = log(n)
// x log(3) = log(n)
// x = log(n) / log(3)

 var isPowerOfThree = function(n) {
    var temp = Math.log(n)/Math.log(3);
    return Math.abs(temp - Math.round(temp))< 0.0000000001;

};
