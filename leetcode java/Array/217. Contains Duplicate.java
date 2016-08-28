/*
Given an array of integers, find if the array contains any duplicates.
 Your function should return true if any value appears at least twice
 in the array, and it should return false if every element is distinct.
 */

/*
思路1：
定义一个map，若次数大于1，则包含了重复值,
但是这样其实空间复杂度是o(n)
（You are here!
 Your runtime beats 17% of javasubmissions）
思路2：
数组进行排序，看是否有相等的。（You are here!
 Your runtime beats 78.58% of javasubmissions）
 */
 public class Solution {
     public boolean containsDuplicate(int[] nums) {
         Map<Integer,Integer> map = new HashMap<Integer,Integer>();

         if(nums.length == 0) {
             return false;
         }

         for(int num:nums) {
             if(!map.containsKey(num)) {
                 map.put(num,1);
             } else {
                 return true;
             }
         }
         return false;
     }
 }

 public class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 1; i++)
        {
            if (nums[i] == nums[i + 1])
                return true;
            else
               continue;
        }
        return false;
    }
}
