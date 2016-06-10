public class Solution {
    public int searchInsert(int[] nums, int target) {
        int len = nums.length,
            high = len - 1,
            low = 0,
            mid = 0;

        while(low <= high) {
            mid = (low+high)/2;
            if(nums[mid] > target) {
                high = mid - 1;
            }else if(nums[mid] < target) {
                low = mid + 1;
            } else {
                return mid;
            }
        }

    }
}
