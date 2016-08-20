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
思路一：递归
1.交换根节点的左右子树
2.对左右子树分别进行递归反转
思路二：迭代

 */
public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if(root == null){
            return root;
        }
        TreeNode node = invertTree(root.left);
        root.left = invertTree(root.right);
        root.right = node;

        return root;
    }
}

public class Solution {
    public TreeNode invertTree(TreeNode root) {
        Queue queue = new L
    }
}
