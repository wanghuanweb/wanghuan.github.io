/*
Say you have an array for which the ith element is the price of a given stock on day i.
If you were only permitted to complete at most one transaction (ie, buy one and sell one
share of the stock), design an algorithm to find the maximum profit.
Example 1:

Input: [7, 1, 5, 3, 6, 4]
Output: 5

max. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than buying price)

Example 2:

Input: [7, 6, 4, 3, 1]
Output: 0

In this case, no transaction is done, i.e. max profit = 0.
 */
 /*
 思路：
 要获得最大利益，其实就是找到相差最大的两个数，也就是求最优解的问题。
 所以可以用动态规划。
 动态规划：
 1.找出最优解的性质，刻画其结构特征--特征就是找到当前数组最小值和当前最大利益
 2.递归的定义最优值
 3.自底向上方式计算最优值
 4.根据计算最优值时得到的信息，构造一个最优解

 因此：
 1.需要动态找出最小值
 2.动态找出(当前值-最小值)和最大差值的最大值
  */
  public class Solution {
     public int maxProfit(int[] prices) {
         int maxProfit = 0,
             length = prices.length;

         if(length < 1){
             return 0;
         }

         int curMin = prices[0];

         for(int i = 1;i < length;i++) {
             curMin = Math.min(curMin,prices[i]);
             maxProfit = Math.max(maxProfit,prices[i] - curMin);
         }

         return maxProfit;
     }
 }
