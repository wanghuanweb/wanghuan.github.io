/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 * 仿照102的思路：
 * 但是因为是zigzag的方法遍历，所以可以用deque，用pollFirst()和pollLast()
 * 但这样就要用两个deque
 */
 public class Solution {
     public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
         List<List<Integer>> list = new LinkedList<List<Integer>>();
         Deque<TreeNode> queue = new LinkedList<TreeNode>();
         Deque<TreeNode> nextQueue = new LinkedList<TreeNode>();

         int flag = 1;

         queue.offer(root);

        // 此行需要加，因为不加就算是null也会进入while循环，因为null加进去了，并且m=1
         if(root == null) {
             return list;
         }

         // 记录每一层元素
         List<Integer> level = new LinkedList<Integer>();

         while(!queue.isEmpty()) {
            // 将特定层的数据存于list中,下一层存于queue中
             TreeNode node = queue.removeLast();
             level.add(node.val);
             // 若是从右向左
             if (flag == 1) {
                 if(node.right != null) {
                     nextQueue.offer(node.right);
                 }
                 if(node.left != null) {
                     nextQueue.offer(node.left);
                 }
             }
             // 若是从左向右
             else {
                 if(node.left != null) {
                     nextQueue.offer(node.left);
                 }
                 if(node.right != null) {
                     nextQueue.offer(node.right);
                 }
             }

             if(queue.isEmpty()) {
                 Deque<TreeNode> temp = nextQueue;
                 nextQueue = queue;
                 queue = temp;

                 flag = 1 - flag;

                 list.add(level);
                 level = new LinkedList();
             }
         }
         return list;
     }
 }
