/*
Given a binary tree, imagine yourself standing on the right side of it, return the values
of the nodes you can see ordered from top to bottom.
For example:
 Given the following binary tree,

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
You should return [1, 3, 4].

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
 /*
思路：
从右边看，并不是指右节点--也就是每层最右边的节点，则考虑层次遍历只取最右
  */
  public class Solution {
      public List<Integer> rightSideView(TreeNode root) {
          List<Integer> list = new LinkedList<Integer>();
          Queue<TreeNode> queue = new LinkedList<TreeNode>();

          if(root == null) {
              return list;
          }
          queue.add(root);

          while(!queue.isEmpty()) {
              int m = queue.size();
              while(m > 0) {
                  TreeNode node = queue.remove();
                  if(node.left != null) {
                      queue.add(node.left);
                  }
                  if(node.right != null) {
                      queue.add(node.right);
                  }
                  m--;
                  if(m == 0) {
                      list.add(node.val);
                  }
              }
          }
          return list;
      }
  }
