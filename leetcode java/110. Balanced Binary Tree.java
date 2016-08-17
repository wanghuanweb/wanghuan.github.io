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
平衡二叉树：它是一 棵空树或它的左右两个子树的高度差的绝对值不超过1
1.递归判断二叉树是否是平衡二叉树
2.递归找二叉树高度,求高度也是用递归
    递归停止条件：
    递归到叶子节点时终止，即root.left==null && root.right == null时,返回1；root==null时，返回0。
 */
 public class Solution {
     public boolean isBalanced(TreeNode root) {
         if(root == null) {
             return true;
         }

         int l = height(root.left);
         int r = height(root.right);

         //若本节点满足平衡二叉树，判断左右子树是否满足
         if(l-r >= -1 && l-r <= 1) {
             return isBalanced(root.left) && isBalanced(root.right);
         } else {
             return false;
         }
     }

     public int height(TreeNode root) {
         int leftHeight,
             rightHeight;

         if(root == null) {
             return 0;
         }

         if(root.left == null && root.right == null) {
             return 1;
         }
         leftHeight = height(root.left);
         rightHeight = height(root.right);

         return leftHeight>=rightHeight ? leftHeight+1:rightHeight+1;
     }
 }
