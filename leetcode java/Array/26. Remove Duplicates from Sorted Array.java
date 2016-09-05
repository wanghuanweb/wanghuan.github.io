/*
思路：
数组中和前一个不重复的加到数组中即可
但是这个题主要是用一个i遍历，index来追踪
同样27也是一样的，都是用i和index
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
