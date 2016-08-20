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
思路一：
1.不是BST，则先遍历节点, 找到p,q. 记录下从root到该几点的路径.
2.比较路径,最后一个相同的节点便是LCA.
思路二：
遍历判断两个node是否在左右子树中
 */
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // 左右子树探索时发现目标节点，则通过返回值标记
        if(root == null || p == root || q == root) {
            return root;
        }

        // 查看左子树中是否有目标结点，没有为null
        TreeNode l = lowestCommonAncestor(root.left,p,q);
        // 查看右子树中是否有目标结点，没有为null
        TreeNode r = lowestCommonAncestor(root.right,p,q);

        //都不为空，说明做右子树都有目标结点，则公共祖先就是本身
        if(l!= null && r!= null) {
            return root;
        }
        // 其他情况，则要继续向上标记，显示此节点下边有目标节点
        return l != null?l:r;
    }
}
