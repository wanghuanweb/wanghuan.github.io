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
先层次遍历出list
再让list倒置
 */
 public class Solution {
     public List<List<Integer>> levelOrderBottom(TreeNode root) {
         List<List<Integer>> list = new LinkedList<List<Integer>>();
         Queue<TreeNode> queue = new LinkedList<TreeNode>();

         if(root == null) {
             return list;
         }

         queue.offer(root);

         while(!queue.isEmpty()) {
             int m = queue.size();
             List<Integer> level = new LinkedList<Integer>();

             while(m > 0) {
                 TreeNode node = queue.peek();

                 if(node.left != null) {
                     queue.offer(node.left);
                 }
                 if(node.right != null) {
                     queue.offer(node.right);
                 }

                 level.add(queue.poll().val);
                 m--;
             }
             list.add(level);
         }

         Collections.reverse(list);
         return list;
     }
 }
