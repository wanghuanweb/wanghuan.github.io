/*
此题要返回的是数组的下标，所以本来想先排序数组两头搜索节省空间，
但要返回下标呀，就不能那样写了~
 */
public class Solution {
    public int[] twoSum(int[] nums, int target) {

        int i = 0,
            len = nums.length,
            total = 0;

        int[] array = new int[2];

        if(len < 2) {
            return array;
        }
        for(;i < len;i++) {
            for(int j = i + 1;j < len;j++) {
                total = nums[i] + nums[j];
            if(total == target) {
                array[0] = i;
                array[1] = j;
                break;
            }
        }
      }
      return array;
   }
}
