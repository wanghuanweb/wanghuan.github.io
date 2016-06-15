/*
动态规划：dynamic programming--DP问题
1.找出最优解的性质，刻画其结构特征–特征就是找到当前数组最小值和当前最大利益
2.递归的定义最优值
3.自底向上方式计算最优值
4.根据计算最优值时得到的信息，构造一个最优解
 */
/*
使用动态规划求解问题，最重要的就是确定动态规划三要素：
1.问题的阶段
2.每个阶段的状态
3.从前一个阶段转化到后一个阶段之间的递推关系。
动态规划往往可以用递归程序来实现，不过因为递推可以充分利用前面保存的子问题的解来减少重复计算，
所以对于大规模问题来说，有递归不可比拟的优势，这也是动态规划算法的核心之处。
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
