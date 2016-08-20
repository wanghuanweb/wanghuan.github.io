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
1.根据preorder确定根节点
2.在inorder中找到此根节点，找到左子树和右子树递归
 */
 public class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return buildTree(preorder,0,preorder.length - 1,inorder,0, inorder.length - 1);
    }

    public TreeNode buildTree(int[] preorder,int preStart,int preEnd,int[] inorder,int inStart,int inEnd) {
        if(preStart > preEnd) {
            return null;
        }

        int val = preorder[preStart];
        TreeNode root = new TreeNode(val);

        int leftSize = 0;
        for(int i = inStart;i <= inEnd;i++){
            if(inorder[i] == val) {
                break;
            }
            leftSize++;
        }

        root.left = buildTree(preorder,preStart + 1,preStart + leftSize,inorder,inStart,inStart + leftSize - 1);
        root.right = buildTree(preorder,preStart + 1 + leftSize,preEnd,inorder,inStart + leftSize + 1,inEnd);

        return root;
    }
}
