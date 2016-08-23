/*
Write a program to find the n-th ugly number.
Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
For example, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note that 1 is typically treated as an ugly number.
 */
/*
这个算法超时
 */
 public class Solution {
     public int nthUglyNumber(int n) {
         int count = 0;
         int i = 1;

         for(;i <= Integer.MAX_VALUE;i++) {
             if(isUgly(i)){
                 count++;
                 if(count == n) {
                     break;
                 }
             }
         }
         return i;
     }

     public boolean isUgly(int num) {
         if(num <= 0) {
             return false;
         }
         if(num == 1) {
             return true;
         }
         while(num % 2 == 0 && num >=2) {
             num = num/2;
         }
         while(num % 3 == 0 && num >=3) {
             num = num/3;
         }
         while(num % 5 == 0 && num >=5) {
             num = num/5;
         }
         return num == 1;
     }
 }
