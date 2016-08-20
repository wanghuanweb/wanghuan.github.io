/*
Given an integer array with all positive numbers and no duplicates,
find the number of possible combinations that add up to a positive integer target.
nums = [1, 2, 3]
target = 4

The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)

Note that different sequences are counted as different combinations.

Therefore the output is 7.
 */
/*
思路：
本题就是动态规划，需要找到公式
档target >= nums[i]时叠加， target <= nums[i]则停止
dp[target] = dp[target - nums[1]] + dp[target - nums[2]] + ... + dp[target + nums[*]];dp[0] = 1;
 */
 public class Solution {
     public int combinationSum4(int[] nums, int target) {
         int[] dp = new int[target + 1];
         dp[0] = 1;

         for(int i = 1; i <= target;i++) {
             for(int j = 0;j < nums.length;j++) {
                 if(i >= nums[j]) {
                     dp[i] += dp[i - nums[j]];
                 }
             }
         }
         return dp[target];
     }
 }
