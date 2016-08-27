/*
Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.
An example is the root-to-leaf path 1->2->3 which represents the number 123.
Find the total sum of all root-to-leaf numbers.

For example,
    1
   / \
  2   3
The root-to-leaf path 1->2 represents the number 12.
 The root-to-leaf path 1->3 represents the number 13.
Return the sum = 12 + 13 = 25.
 */
 /**
  * Definition for a binary tree node.
  * public class TreeNode {
  *     int val;
  *     TreeNode left;
  *     TreeNode right;
  *     TreeNode(int x) { val = x; }
  * }
  */
 /*
思路：
其实就是找到所有的路径(递归)，进行处理，然后把所有路径得到的数字相加,可以参考257
  */
  public class Solution {
      public int sumNumbers(TreeNode root) {
          List<Integer> list = new LinkedList<Integer>();

          if(root == null){
              return 0;
          }
          int sum = 0;
          findPaths(list,sum,root);

          for(Integer i:list) {
              sum += i;
          }
          return sum;
      }

      public void findPaths(List<Integer> list,Integer sum,TreeNode root) {
          if(root == null) {
              return;
          }
          if(root.left == null && root.right == null) {
              list.add(sum*10 + root.val);
              return;
          }
          findPaths(list,sum*10+root.val,root.left);
          findPaths(list,sum*10+root.val,root.right);
      }
  }
