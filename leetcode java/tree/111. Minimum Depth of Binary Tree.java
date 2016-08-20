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
最小深度就是根节点到最近叶子节点的路径长度
和找二叉树的最大深度类似，但是区别如下：
1.注意l < r? l+1:r+1;
 */
