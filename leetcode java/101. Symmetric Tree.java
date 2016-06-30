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
思路一：
递归：1ms
先判断左右子节点是否相等，不等就返回false
相等则判断左节点的左孩子和右节点的右孩子是否相等，且判断左节点的右孩子和右节点的左孩子是否相等。
思路二：
迭代
 */
 public class Solution {
     public boolean isSymmetric(TreeNode root) {
         if(root == null) {
             return true;
         } else {
             return isSame(root.left,root.right);
         }
     }

     public boolean isSame(TreeNode left,TreeNode right) {
         if(left == null && right == null) {
             return true;
         }
         if(left == null || right == null) {
             return false;
         }
         if(left.val != right.val) {
             return false;
         }
         return isSame(left.left,right.right) && isSame(left.right,right.left);
     }
 }


 public class Solution {
    public boolean isSymmetric(TreeNode root) {
        if(root == null) {
            return true;
        }
        Queue<TreeNode> left = new LinkedList<TreeNode>();
        Queue<TreeNode> right = new LinkedList<TreeNode>();

        if(root.left != null) {
            left.offer(root.left);
        }
        if(root.right != null) {
            right.offer(root.right);
        }

        while(!left.isEmpty() && !right.isEmpty()) {
            TreeNode l = left.poll();
            TreeNode r = right.poll();

            if(r == null && l == null) {
                continue;
            }
            if(r == null || l == null) {
                return false;
            }
            if(l.val != r.val) {
                return false;
            }
            left.offer(l.left);
            left.offer(l.right);
            right.offer(r.right);
            right.offer(r.left);
        }

        if(left.isEmpty() && right.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}
