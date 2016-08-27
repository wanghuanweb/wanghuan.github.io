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
最小深度就是根节点到最近叶子节点的路径长度
和找二叉树的最大深度类似，但是区别如下：
递归终止条件：
1.根节点为null时，返回0
2.根节点左右都null时，返回1
3.大返回终止条件：返回较小值+1
但是需要注意的是：
这样就无法保证root是否是叶子节点了，
 */
 public class Solution {
      public int minDepth(TreeNode root) {
          if(root==null) return 0;

         if(root.left==null) return minDepth(root.right)+1;
         if(root.right==null) return minDepth(root.left)+1;
         return Math.min(minDepth(root.right), minDepth(root.left)) + 1;
      }
  }


 public class Solution {
     public int minDepth(TreeNode root) {
         if(root == null) {
             return 0;
         }

         if(root.left == null && root.right == null) {
             return 1;
         }

         int l,r;
         if(root.left != null) {
             l = minDepth(root.left);
         } else {
             l = Integer.MAX_VALUE;
         }

         if(root.right != null) {
             r = minDepth(root.right);
         } else {
             r = Integer.MAX_VALUE;
         }

         return l>=r?r+1:l+1;
     }
 }
