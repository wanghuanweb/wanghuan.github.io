/*
Given a positive integer n, find the least number of perfect square
numbers (for example, 1, 4, 9, 16, ...) which sum to n.

For example, given n = 12, return 3 because 12 = 4 + 4 + 4;
given n = 13, return 2 because 13 = 4 + 9.
 */
/*
之前的错误思路：
以为每次取平方根的最大数，其实这样求出的个数不是题目中要求最少的，所以更换思路
 */
 public class Solution {
     public int numSquares(int n) {
         int total = n,
             count = 0;

         while(total != 0) {
             int sqrtNum = (int)Math.floor(Math.sqrt(total));
             System.out.println(sqrtNum);
             total -= sqrtNum * sqrtNum;
             count++;
         }
         return count;
     }
 }
 /*
这个题其实用动态规划dp，x = a+b*b;若x组成最少的平方根个数，则a肯定也是由于最少的平方根个数。所以用dp很合适。
递归公式：(因为i+j*j也可能是平方根公式)
1.dp[i + j*j] = min(dp[i]+1,dp[i+j*j]);
2.初始化dp[i*i]为1
  */
 /*
这个题还可以用四平方和的方法
  */
  public class Solution {
     public int numSquares(int n) {
         int[] dp = new int[n+1];
        //  确保后边选min的正确
         Arrays.fill(dp,Integer.MAX_VALUE);

         for(int i = 0;i*i <= n;i++) {
             dp[i*i] = 1;
         }
        //  从小到大找整数i
         for(int i = 0;i <= n;i++) {
            //  从小到大找平方数j*j
             for(int j = 1;i+j*j <= n;j++) {
                 dp[i +j * j] = Math.min(dp[i]+1,dp[i+j*j]);
             }
         }
         return dp[n];
     }
 }
