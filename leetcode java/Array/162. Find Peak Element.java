/*
A peak element is an element that is greater than its neighbors.
Given an input array where num[i] ≠ num[i+1], find a peak element
and return its index.
The array may contain multiple peaks, in that case return the index
to any one of the peaks is fine.
You may imagine that num[-1] = num[n] = -∞.
For example, in array [1, 2, 3, 1], 3 is a peak element and
your function should return the index number 2.

 */
/*
此题表面是看找出比旁边两个值大就可以，也就是如思路一。但是复杂度是o(n)
但是其实找到数组中的最大值就可以了，则用二分查找就可以了。复杂度是o(lgn)
 */
// 思路一：
// 遍历来找到nums[i]，但是只打败了2%，就像看看其他人的想法
 public class Solution {
      public int findPeakElement(int[] nums) {
          int len = nums.length,
              i = 0;

          if(len < 2) {
              return 0;
          }

          for(;i < len;i++) {
              if(i == 0 && nums[0] > nums[1]){
                 return 0;
             }else if(i == len-1 && nums[i] > nums[i-1]) {
                 return i;
             } else if(nums[i] > nums[i+1] && nums[i] > nums[i-1]){
                 return i;
             }
          }
          return 0;
      }
  }
  // 思路二：二分查找
  public class Solution {
    public int findPeakElement(int[] nums) {
        int len = nums.length,
            left = 0,
            right = len - 1;

        while(left < right) {
            int mid = left + (right-left)/2;

            if(nums[mid] < nums[mid+1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
}
