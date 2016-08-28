/*
思路：
数组中和前一个不重复的加到数组中即可
 */
public class Solution {
    public int removeDuplicates(int[] nums) {
        int len = nums.length,
            index = 0,
            i = 1;

        for(;i < len;i++) {
            if(nums[index] != nums[i]) {
                index++;
                nums[index] = nums[i];
            }
        }
        return index+1;
    }
}
