/*
本题用动态规划
分治法和动态规划
相同点：都是将原问题分而治之,分解成若干个规模较小
区别：
分治法常常利用递归求解，分解后的子问题看成相互独立的
动态规划通常利用迭代自底向上求解，或者具有记忆能力对桂法自顶向下，其分解的子问题理解成相互有联系的
思路：
当有n个节点时(1--n),任何一个数都可以当成根节点，左边j个节点，右边是n-j-1个节点
所以就有nums[n] = nums[0]*nums[n]+nums[1]*nums[n-1]+nums[2]*nums[n-2]+...+nums[n]*nums[0];
因此我们需要先求出nums[0]--nums[n-1]
最后返回nums[n]即可
 */
public class Solution {
    public int numTrees(int n) {
        if(n == 0 || n == 1) {
            return 1;
        }
        int[] nums = new int[n+1];

        nums[0] = 1;
        nums[1] = 1;

        for(int i = 2;i <= n;i++) {
            for(int j = 0;j < i;j++) {
                nums[i] += nums[j]*nums[i-j-1];
            }
        }

        return nums[n];
    }
}
