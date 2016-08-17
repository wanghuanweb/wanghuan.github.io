/*
先不考虑进位，则是a和b异或
考虑进位，则是a and b然后进位
二者相加即可
 */
 public class Solution {
     public int getSum(int a, int b) {
         int axorb = a ^ b,
             aandb = (a & b)<<1;

         return axorb + aandb;
     }
 }
