/*
Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.
Note:
 You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

Follow up:
 What if the BST is modified (insert/delete operations) often and you need to find
 the kth smallest frequently? How would you optimize the kthSmallest routine?
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
因为是BST，则中序（左根右）遍历得到list，找list的第k个元素
其实可以尝试下非递归，这样估计效率也高些
 */

 public class Solution {
   public int kthSmallest(TreeNode root, int k) {
       if(root == null) {
           return 0;
       }

       List<Integer> list = new ArrayList<Integer>();

       list = traversalTree(root);
       return list.get(k-1);
   }
   public List<Integer> traversalTree(TreeNode root) {
       List<Integer> list = new ArrayList<Integer>();

       if(root != null) {
           list.addAll(traversalTree(root.left));
           list.add(root.val);
           list.addAll(traversalTree(root.right));
       }
       return list;
   }

}
