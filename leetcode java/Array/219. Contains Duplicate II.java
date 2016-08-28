/*
Given an array of integers and an integer k, find out whether
there are two distinct indices i and j in the array such that
nums[i] = nums[j] and the difference between i and j is at most k.
 */
/*
思路：使用map，更新value，但是超时了！！，于是发现map.put(nums[i],i);在fi和else中都有，
则优化一下就可以了！
 */
 public class Solution {
     public boolean containsNearbyDuplicate(int[] nums, int k) {
         Map<Integer,Integer> map = new HashMap<Integer,Integer>();
         int len = nums.length,
             i = 0;

         for(;i < len;i++) {
             if(!map.containsKey(nums[i])) {
                 map.put(nums[i],i);
             }else{
                 if((i - map.get(nums[i])) <= k) {
                     return true;
                 }
                 map.put(nums[i],i);
             }
         }
         return false;
     }
 }


 public class Solution {
     public boolean containsNearbyDuplicate(int[] nums, int k) {
         Map<Integer,Integer> map = new HashMap<Integer,Integer>();
         int len = nums.length,
             i = 0;

         for(;i < len;i++) {
             if(map.containsKey(nums[i])) {
                 if((i - map.get(nums[i])) <= k) {
                     return true;
                 }
             }
             map.put(nums[i],i);
         }
         return false;
     }
 }
