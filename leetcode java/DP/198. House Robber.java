/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed,
the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and
it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house,
 determine the maximum amount of money you can rob tonight without alerting the police.

 */
// 考查动态规划，基本思路是当前节点处最大值curMax = Math.max(curMax, curPrePreMax + cur)
 public class Solution {
     public int rob(int[] nums) {
         int curMax = 0,
             curPrePreMax = 0;

         for(int cur:nums) {
             int temp = curMax;
             curMax = Math.max(curMax,curPrePreMax + cur);
             curPrePreMax = temp;
         }
         return curMax;
     }
 }
