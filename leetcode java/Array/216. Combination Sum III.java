/*
Find all possible combinations of k numbers that add up to a number n,
given that only numbers from 1 to 9 can be used and each combination
should be a unique set of numbers.
Example 1:
Input: k = 3, n = 7
Output:
[[1,2,4]]

Example 2:
Input: k = 3, n = 9
Output:
[[1,2,6], [1,3,5], [2,3,4]]
 */
 public class Solution {
     public List<List<Integer>> result;
     public List<Integer> seq;

     public List<List<Integer>> combinationSum3(int k, int n) {
         result = new ArrayList<List<Integer>>();
         seq = new ArrayList<Integer>();

         findPaths(k,n,0,1);

         return result;
     }

     public void findPaths(int num,int sum,int total,int level) {
         if(sum == total && num == 0) {
             result.add(new ArrayList<Integer> (seq));
             return;
         }
         if(sum < total || num < 0) {
             return;
         }

         for(int i = level;i <= 9;i++) {
             total += i;
             seq.add(i);
             findPaths(num-1,sum,total,i+1);
             total -= i;
             seq.remove(seq.size()-1);
         }
     }
 }
