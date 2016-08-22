/*
这个题其实用动态规划dp，x = a+b*b;若x组成最少的平方根个数，则a肯定也是由于最少的平方根个数。所以用dp很合适。
递归公式：(因为i+j*j也可能是平方根公式)
1.dp[i + j*j] = min(dp[i]+1,dp[i+j*j]);
2.初始化dp[i*i]为1
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
