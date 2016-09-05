/*
Given an array with n objects colored red, white or blue, sort them so that
objects of the same color are adjacent, with the colors in the order red,
white and blue.
Here, we will use the integers 0, 1, and 2 to represent the color red,
white, and blue respectively.
 */

/*
要把0,1,2放在一起，直接排序不就好了~只打败了4%
 */
 public class Solution {
     public void sortColors(int[] nums) {
         Arrays.sort(nums);
     }
 }
 /*
平移插入其实也很简单，beats 76.75%
  */
  public class Solution {
      public void sortColors(int[] nums) {
          int len = nums.length,
              k = -1,
              j = -1,
              i = -1;

          for(int l = 0;l < len;l++) {
              //根据第i个数字，挪动0~i-1串。
              if(nums[l] == 0) {
                  nums[++k] = 2;//2往后挪
                  nums[++j] = 1;//1往后挪
                  nums[++i] = 0;//0往后挪
              } else if(nums[l] == 1) {
                  nums[++k] = 2;
                  nums[++j] = 1;
              } else {
                  nums[++k] = 2;
              }
          }
      }
  }
