/*
Rotate an array of n elements to the right by k steps.
For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7]
is rotated to [5,6,7,1,2,3,4].

Note:
 Try to come up as many solutions as you can, there are at least 3 different
 ways to solve this problem.
 */
/*
思路：
1.整个数组翻转
2.前半部分(0-k-1)翻转
3.后半部分(k-n-1)翻转
翻转：
头尾调换实现数组翻转
 */
 public class Solution {
    public void rotate(int[] nums, int k) {
        int len = nums.length;
        // 保证k为正（或者是k = k%num;）
        k = (len + k % len) % len;
        reverse(nums,0,len-1);
        reverse(nums,0,k-1);
        reverse(nums,k,len-1);

    }

    public void reverse(int[] nums,int begin,int end) {
        for(;begin <= end;begin++,end--) {
            int temp = nums[begin];
            nums[begin] = nums[end];
            nums[end] = temp;
        }
    }
}
