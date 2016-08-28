/*
Given an array nums, write a function to move all 0's to the end of it
while maintaining the relative order of the non-zero elements.

For example, given nums = [0, 1, 0, 3, 12], after calling your function,
nums should be [1, 3, 12, 0, 0].
Note:

1.You must do this in-place without making a copy of the array.
2.Minimize the total number of operations.

 */
/*
思路：
使用两个指针，一个遍历，一个方便存储
 */
 public class Solution {
    public void moveZeroes(int[] nums) {
        int len = nums.length,
            i = 0,
            j = 0;

        for(;i < len;i++) {
            if(nums[i] != 0) {
                if(i != j) {
                    nums[j] = nums[i];
                    nums[i] = 0;
                }
                j++;
            }
        }
    }
}
