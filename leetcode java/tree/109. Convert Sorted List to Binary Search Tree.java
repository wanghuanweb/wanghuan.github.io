/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 * 思路：
 1.找到排序链表的中点--所以说如何找链表的中点变成了重点！
    1） 使用两个指针进行遍历，快指针每次步进2，慢指针每次步进1；
    2） 当快指针到达链表尾部的时候，慢指针指向的就是链表的中点。
 2.递归生成左子树和右子树
 */
public class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        if(head == null) {
            return null;
        }

        ListNode end = head;

        while(end.next != null) {
            end = end.next;
        }

        return search(head,end);
    }

    public TreeNode search(ListNode head,ListNode end) {
        ListNode mid = head,
                 fast = head;

        while(fast && fast.next) {
            mid = mid.next;
            fast = mid.next.next;
        }

        TreeNode root = new TreeNode(mid.val);

        root.left = search(head,mid);
        root.right = search(mid.next,end);

        return root;
    }
}
