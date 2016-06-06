/*
思路：
要获得最大利益，其实就是找到相差最大的两个数，也就是求最优解的问题。
所以可以用动态规划。
动态规划：
1.找出最优解的性质，刻画其结构特征--特征就是找到当前数组最小值和当前最大利益
2.递归的定义最优值
3.自底向上方式计算最优值
4.根据计算最优值时得到的信息，构造一个最优解
 */
public class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0,
            len = prices.length,
            i = 1;

        if(len < 1) {
            return 0;
        }

        int curMin = prices[0];

        for(;i < len;i++) {
            curMin = Math.min(curMin,prices[i]);
            maxProfit = Math.max(maxProfit,prices[i] - curMin);
        }

        return maxProfit;
    }
}
