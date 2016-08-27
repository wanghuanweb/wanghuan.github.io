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
递归终止条件：
1.根节点为null时，返回0
2.根节点左右都是null时，返回1
3.大返回终止条件：返回较大值+1
 */
public class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) {
            return 0;
        }
        if(root.left == null && root.right == null) {
            return 1;
        }

        int l = maxDepth(root.left);
        int r = maxDepth(root.right);

        return l >= r? l+1:r+1;
    }
}
