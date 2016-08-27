public class Solution {
    public int removeElement(int[] nums, int val) {
        int len = nums.length,
            i = 0,
            index = 0;

        for(;i < len;i++) {
            if(nums[i] != val) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
}
