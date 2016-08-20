/*
A sequence of numbers is called a wiggle sequence if the differences between successive numbers strictly alternate
between positive and negative. The first difference (if one exists) may be either positive or negative.
A sequence with fewer than two elements is trivially a wiggle sequence.

For example, [1,7,4,9,2,5] is a wiggle sequence because the differences (6,-3,5,-7,3) are alternately
positive and negative. In contrast, [1,4,7,2,5] and [1,7,4,5,5] are not wiggle sequences, the first because
its first two differences are positive and the second because its last difference is zero.

Given a sequence of integers, return the length of the longest subsequence that is a wiggle sequence.
A subsequence is obtained by deleting some number of elements (eventually, also zero) from the original sequence,
leaving the remaining elements in their original order.
Input: [1,7,4,9,2,5]
Output: 6
The entire sequence is a wiggle sequence.

Input: [1,17,5,10,13,15,10,5,16,8]
Output: 7
There are several subsequences that achieve this length. One is [1,17,10,13,10,16,8].

Input: [1,2,3,4,5,6,7,8,9]
Output: 2
 */
/*
先想动态规划的表达式：
if((nums[i] - nums[j])*(nums[j] - nums[j-1])<0) {
    dp[i] = max(dp[i],dp[j] + 1);
} else {
    dp[i] = max(dp[i],dp[j]);
}
 */
 public class Solution {
     public int wiggleMaxLength(int[] nums) {
         int len = nums.length,
             i = 1,
             j = 2;
        int[] dp = new int[len];

        dp[0] = 1;
        dp[1] = dp[0] + nums[1] != nums[0];

        for(;i < len;i++) {
            for(;j < len;j++) {
                dp[i] = Math.max(dp[i],dp[j] + nums[i] - nums[j])*(nums[j] - nums[j-1]));
            }
        }
        return dp[len - 1];
     }
 }
