// 题目说明：
// Given an array of integers, find if the array contains any duplicates.
// Your function should return true if any value appears at least twice in the array,
// and it should return false if every element is distinct.

/**
 * 思路：
 *
 */

 /**
  * @param {number[]} nums
  * @return {boolean}
  */
 
  var containsDuplicate = function(nums) {
      var len = nums.length,
          i = 0,
          j;

      for(;i < len;i++) {
          for(j = i+1;j < len;j++) {
              if(nums[i] === nums[j]) {
                  return true;
              }
          }
      }

      return false;
  };
