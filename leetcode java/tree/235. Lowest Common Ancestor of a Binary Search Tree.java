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
如果p,q 比root小, 则LCA必定在左子树；如果p,q 比root大, 则LCA必定在右子树；若一小一大，则LCA是root
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
 public class Solution {
     public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {

         if(root.val > p.val && root.val > q.val) {
             return lowestCommonAncestor(root.left,p,q);
         }else if(root.val < p.val && root.val < q.val) {
             return lowestCommonAncestor(root.right,p,q);
         }else {
             return root;
         }
     }
 }
