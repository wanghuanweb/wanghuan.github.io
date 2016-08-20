public class Solution {
    public int maxProfit(int[] prices) {
        int len = prices.length,
            sum = 0,
            i = 0;

        for(;i < len - 1;i++) {
            if(prices[i+1] > prices[i]) {
                int delta = prices[i+1] - prices[i];
                sum = sum + delta;
            }
        }
        return sum;
    }
}
