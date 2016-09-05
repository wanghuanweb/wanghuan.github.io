/*
Suppose a sorted array is rotated at some pivot unknown to you beforehand.
(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
Find the minimum element.
You may assume no duplicate exists in the array.
 */
/*
1.动态规划找出最小值，复杂度是o(n)
2.二分法，复杂度是o(lgn)
 */
 public class Solution {
     public int findMin(int[] nums) {
         int len = nums.length,
             low = 0,
             high = len - 1;

         while(low < high) {
             int mid = (low+high)/2;

             if(nums[mid] > nums[high]) {
                 low = mid + 1;
             }else {
                 high = mid;
             }
         }
         return nums[low];
     }
 }
