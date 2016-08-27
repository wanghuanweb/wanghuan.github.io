/*
Your task is to calculate ab mod 1337 where a is a positive integer and b
is an extremely large positive integer given in the form of an array.

Example1:
a = 2
b = [3]
Result: 8

Example2:
a = 2
b = [1,0]
Result: 1024
 */
// 一些简单的例子用下边的可以，但是当数很大的时候，则会是先求a^total,Math.pow(a,total)会Infinity，则此方法不行
// 正确思路在下边
 public class Solution {
     public int superPow(int a, int[] b) {
         int len = b.length;

         if(len == 0){
             return 0;
         }
         int total = b[0];

         for(int i = 1;i < len;i++) {
             total = total*10 +b[1];
         }
        //  Math.pow返回double类型
         total = (int)(Math.pow(a,total) % 1337);
         return total;
     }
 }
/*
思路：
其实本题是一个快速幂取模算法，其实就是快速的求一个幂式的模（本质也是求一个大数对于某个数的余数）

 */
 public class Solution {
     public int superPow(int a, int[] b) {
         int len = b.length;

         if(len == 0){
             return 0;
         }
         int total = b[0];

         for(int i = 1;i < len;i++) {
             total = total*10 +b[1];
         }
        //  Math.pow返回double类型
         total = (int)(Math.pow(a % 1337,total % 1337));
         return total;
     }
 }
