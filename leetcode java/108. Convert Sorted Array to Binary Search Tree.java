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
二叉搜索树特点：小的值在左边，大的值在右边
这样的结构有一个好处是很容易获得最大值（Maximum）、最小值（minimum）、某元素的前驱（Precursor）、某元素的后继（Successor）。
最大值：树的最右节点。
最小值：树的最左节点。
某元素前驱：左子树的最右。
某元素的后继：右子树的最左。

思路：
1.找到排序数组的中点
2.递归生成左子树和右子树
 */
 public class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if(nums.length == 0) {
            return null;
        }

        return sortedArrayToBST(nums,0,nums.length - 1);
    }

    public TreeNode sortedArrayToBST(int[] nums,int start,int end) {
        int mid = (start + end) /2,
            val = nums[mid];

        if(start > end) {
            return null;
        }

        TreeNode root = new TreeNode(val);

        root.left = sortedArrayToBST(nums,start,mid - 1);
        root.right = sortedArrayToBST(nums,mid + 1,end);

        return root;
    }
}
