/*
Given a non-negative integer n, count all numbers with unique digits,
 x, where 0 ≤ x < 10^n.

Example:
 Given n = 2, return 91. (The answer should be the total numbers
  in the range of 0 ≤ x < 100, excluding [11,22,33,44,55,66,77,88,99])

 */
/*
思路:
要想数字不一样，用到数学中的排列组合：
当n=1时;
因为只有一个数字，所以0-9都是答案．
当n>=2时;
第一位是非0，则有9种情况
第二位和第一位不同，也有9种情况
第三位有8种情况
......
 */
 public class Solution {
     public int countNumbersWithUniqueDigits(int n) {
         if(n == 0) {
             return 1;
         }

         if(n == 1) {
             return 10;
         }

         int digits = 9,
             val = 10;

         for(int i = 2;i <= n;i++) {
             digits = digits*(9 - i + 2);
             val = val + digits;
         }
         return val;
     }
 }
