/*
Given a collection of candidate numbers (C) and a target number (T),
find all unique combinations in C where the candidate numbers sums to T.
Each number in C may only be used once in the combination.
Note:
•All numbers (including target) will be positive integers.
•The solution set must not contain duplicate combinations.

For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8,
 A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
 */
/*
此题和39题类似，但是区别是：
1.注意因为数字可以重复，为了防止结果又重复，则不用List<List<Integer>>，但用Set<List<Integer>>
2.因为本身数字不能重复，则递归的时候level应该+1
 */
 public class Solution {
     public Set<List<Integer>> result;
     public List<Integer> seq;

     public List<List<Integer>> combinationSum2(int[] candidates, int target) {
         Arrays.sort(candidates);
         result = new HashSet<List<Integer>>();
         seq = new ArrayList<Integer>();

         findPaths(candidates,target,0,0);
        //  注意因为数字可以重复,但需要返回List<List<Integer>>
         return new ArrayList<List<Integer>> (result);
     }

     public void findPaths(int[] candidates,int target,int sum,int level) {
         if(sum == target) {
             result.add(new ArrayList<Integer> (seq));
             return;
         }
         if(sum > target) {
             return;
         }
         for(int i = level;i < candidates.length;i++) {
             //  相当于是当前节点压入栈
             sum += candidates[i];
             seq.add(candidates[i]);
            //  因为本身数字不能重复，则递归的时候level应该+1
             findPaths(candidates,target,sum,i+1);
             //  没返回值，也就是当前节点不符合，则弹出栈的意思
             sum -= candidates[i];
             seq.remove(seq.size() - 1);
         }
     }
 }
