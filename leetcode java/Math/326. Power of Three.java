/*
Given an integer, write a function to determine if it is a power of three.
1.递归
2.数学方法
x = log(n)/log(3),x是整数就可以了
--那么判断整数方法：double类型，则绝对值差小于10e-15；floor类型，则绝对值差小于10e-6
 */
 public class Solution {
     public boolean isPowerOfThree(int n) {
         if(n == 1) {
             return true;
         } else if(n == 0) {
             return false;
         } else if(n % 3 == 0) {
             return isPowerOfThree(n/3);
         } else {
             return false;
         }
     }
 }

 public class Solution {
     public boolean isPowerOfThree(int n) {
         if(n == 0) {
             return false;
         }
         double x = Math.log(n)/Math.log(3);

         return Math.abs(x - Math.round(x)) < 10e-15;
     }
 }
