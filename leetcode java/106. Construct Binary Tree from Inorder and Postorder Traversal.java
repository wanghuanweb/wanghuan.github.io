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
 1.根据postorder确定根节点
 2.在inorder中找到此根节点，找到左子树和右子树递归
  */
  public class Solution {
      public TreeNode buildTree(int[] inorder, int[] postorder) {
          return buildTree(inorder,0,inorder.length - 1,postorder,0,postorder.length - 1);
      }
      public TreeNode buildTree(int[] inorder,int inBegin,int inEnd,int[] postorder,int postBegin,int postEnd) {
          if(inBegin > inEnd) {
              return null;
          }
          // 找到根节点
          int val = postorder[postEnd];
          TreeNode root = new TreeNode(val);

          // 在inorder中找到此根节点
          int leftLen = 0,
              i = inBegin;
          for(;i < inEnd;i++) {
              if(val == inorder[i]) {
                  break;
              }
              leftLen++;
          }
          // 需要注意加1
          root.left = buildTree(inorder,inBegin,inBegin + leftLen - 1,postorder,postBegin,postBegin + leftLen - 1);
          root.right = buildTree(inorder,inBegin + leftLen + 1,inEnd,postorder,postBegin + leftLen,postEnd - 1);
          return root;
      }
  }
