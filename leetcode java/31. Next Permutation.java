/*
思路：
123的排序是：
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
next_permutation函数将按字母表顺序生成给定序列的下一个较大的排列，直到整个序列为降序为止
归纳分析这个过程：
假设m个元素的序列pn，下一组较大排列是pn+1
1.若pn最后两个元素构成一个最小的增序序列，直接反转最后两个元素得到pn+1
2.若后面最多s个元素构成了一个减序子集
   令i = m -s，保证i之前的元素不动
   在(i+1)--m这些元素中，遭到仅次于但大于第i个元素，交换这两个元素
   此时只要得到新子集{pn(i+1), pn(i+2), ..., pn(i), ...,pn(m)}的最小排列即可
   注意到新子集仍保持减序，那么直接将其反转即可得到最小的增序子集。
 */
 public class Solution {
     public void nextPermutation(int[] nums) {
         int len = nums.length,
             i = len - 1,
             j = len - 1,
             temp;

        // 找到减序子集的前一个元素，是i-1
         while(i > 0 && nums[i] <= nums[i-1]) {
             i--;
         }

        //  i > 0时，找到倒叙子集中的最大值-第j个元素
         if(i > 0) {
             while(nums[j] <= nums[i-1]) {
                 j--;
             }
            //  让第i-1个元素和第j个元素交换
            temp = nums[j];
            nums[j] = nums[i-1];
            nums[i-1] = temp;
         }

        // 倒置数组
         j = len -1;
         while(i < j) {
             temp = nums[j];
             nums[j] = nums[i];
             nums[i] = temp;
             i++;
             j--;
         }

    }
}
