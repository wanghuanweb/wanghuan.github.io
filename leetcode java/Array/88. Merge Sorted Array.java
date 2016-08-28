/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into
nums1 as one sorted array.
Note:
 You may assume that nums1 has enough space (size that is
 greater or equal to m + n) to hold additional elements from nums2.
 The number of elements initialized in nums1 and nums2 are m and n
 respectively.
 */
/*
思路：
此题需要归并， 但是要节省额外的空间，将nums2合并到nums1，为了防止重复移动，则应该从后向前移动。
：从后往前遍历A和B数组，每次把大的数字从A中m+n位置逐步往前放
 */
 public class Solution {
     public void merge(int[] nums1, int m, int[] nums2, int n) {
         int len1 = m - 1,
             len2 = n - 1,
             lenTotal = m + n -1;

         while(len1 >= 0 && len2 >= 0) {
             if(nums1[len1] >= nums2[len2]) {
                 nums1[lenTotal--] = nums1[len1--];
             } else {
                 nums1[lenTotal--] = nums2[len2--];
             }
         }
        //  就是nums2还有剩余的元素
         if(len1 == -1) {
             while(len2 >= 0) {
                 nums1[lenTotal--] = nums2[len2--];
             }
         }
     }
 }
