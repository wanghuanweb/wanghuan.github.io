/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 *  Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

  For example:
   Given binary tree [3,9,20,null,null,15,7],

      3
     / \
    9  20
      /  \
     15   7

 */
/*
利用广度搜素来实现层次遍历：
1.利用queue，while循环知道queue为null结束
2.本层元素加入存储每层level的list中，利用queue的poll方法，且利用size来控制每层存储的结束
3.下层元素利用offer加到queue中
 */
 public class Solution {
     public List<List<Integer>> levelOrder(TreeNode root) {
         List<List<Integer>> list = new LinkedList<List<Integer>>();
         Queue<TreeNode> queue = new LinkedList<TreeNode>();

         queue.offer(root);

        // 此行需要加，因为不加就算伪null也会进入while循环，因为null加进去了，并且m=1
         if(root == null) {
             return list;
         }

         while(!queue.isEmpty()) {
             int m = queue.size();
             List<Integer> level = new LinkedList<Integer>();

            // 将特定层的数据存于list中,下一层存于queue中
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
         return list;
     }
 }
