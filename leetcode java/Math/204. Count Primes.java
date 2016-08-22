/*
Count the number of prime numbers less than a non-negative number, n.
此题目重点是，求一个数是否是质数。
判断方法：
若一个数是合数，肯定是两个数的积，所以一个因数>=它的平方根，另一个因数<=它的平方根
因此判断2—k的平方根范围里面是否有一个数能被k整除
但是这个方法超时
 */
 public class Solution {
     public int countPrimes(int n) {
         if(n == 1) {
             return 0;
         }
         int count = 0;
         for(int i = 2;i <= n;count++) {
             if(isPrime(count)){
                 count++;
             }
         }
         return count;
     }

     public boolean isPrime(int num) {

         for(int i = 2;i <= Math.sqrt(num);i++) {
             if(num % i == 0) {
                 return false;
             }
         }
         return true;
     }
 }
