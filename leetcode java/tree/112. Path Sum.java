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
    public boolean hasPathSum(TreeNode root, int sum) {
        if(root == null) {
            return false;
        }

        return helper(root,sum,root.val);
    }

    public boolean helper(TreeNode root,int sum,int curSum) {
        if(sum == curSum && root.left == null && root.right == null) {
            return true;
        }

        if(root.left != null && helper(root.left,sum,curSum + root.left.val)) {
                return true;
        }

        if(root.right != null && helper(root.right,sum,curSum + root.right.val)) {
                return true;
        }

        return false;
    }
}
