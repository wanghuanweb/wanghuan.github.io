/*
Given a set of distinct integers, nums, return all possible subsets.
Note: The solution set must not contain duplicate subsets.
For example,
 If nums = [1,2,3], a solution is:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
 */
 public class Solution {
     public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<List<Integer>>();

        int len = nums.length,
            total = len * len;

        for(int i = 0;i < total;i++) {
            List<Integer> list = new ArrayList<Integer>();

            
            result.add(list);
        }
     }
 }
