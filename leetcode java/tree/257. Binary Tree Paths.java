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
1.采用递归
左子树递归找到路径（根节点+左子树）
右子树递归找到路径（根节点+右子树）
2.递归停止条件：
递归到叶子节点时终止，即root.left==null && root.right == null时,将字符串add到result中。
 */
 public class Solution {
     public List<String> binaryTreePaths(TreeNode root) {
         List<String> result = new LinkedList<String>();

         if(root == null) {
             return result;
         }

         findPaths(result,"",root);
         return result;
     }

     public void findPaths(List<String> result,String temp,TreeNode root) {
         if(root == null) {
             return;
         }

         if(root.left == null && root.right == null) {
             result.add(temp+Integer.toString(root.val));
             return;
         }

         findPaths(result,temp+Integer.toString(root.val)+"->",root.left);
         findPaths(result,temp+Integer.toString(root.val)+"->",root.right);
     }
 }
