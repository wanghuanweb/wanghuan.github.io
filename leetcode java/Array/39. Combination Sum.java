/*
Given a set of candidate numbers (C) and a target number (T),
find all unique combinations in C where the candidate numbers sums to T.
The same repeated number may be chosen from C unlimited number of times.
Note:
•All numbers (including target) will be positive integers.
•The solution set must not contain duplicate combinations.
For example, given candidate set [2, 3, 6, 7] and target 7,
 A solution set is:
[
  [7],
  [2, 2, 3]
]
 */
/*
思路l：
深度优先搜索即可。
这个用递归来实现，递归终止条件：
1.如果sum>target直接返回
2.如果sum=target则保存结果
但需要注意的：
每次往result存储时，需要new ArrayList<Integer>，以免替换了以前的值
 */
 public class Solution {
     public List<List<Integer>> result;
     public List<Integer> seq;

     public List<List<Integer>> combinationSum(int[] candidates, int target) {
         result  = new ArrayList<List<Integer>>();
         seq = new ArrayList<Integer>();

         Arrays.sort(candidates);
         findPaths(candidates,target,0,0);

         return result;
     }

     public void findPaths(int[] candidates,int target,int sum,int level) {
         if(target == sum) {
             result.add(new ArrayList<Integer> (seq));
             return;
         }
         if(target < sum) {
             return;
         }

         for(int i = level;i < candidates.length;i++) {
            //  相当于是当前节点压入栈
             seq.add(candidates[i]);
             sum += candidates[i];
             findPaths(candidates,target,sum,i);
            //  没返回值，也就是当前节点不符合，则弹出栈的意思
             seq.remove(seq.size() - 1);
             sum -= candidates[i];
         }
     }
 }
