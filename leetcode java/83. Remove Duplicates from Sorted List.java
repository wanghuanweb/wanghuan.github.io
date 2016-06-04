/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode node = head;
        if(head == null || head.next ==null) {
            return head;
        }
        while(node!=null) {
            while(node.next !=null && node.next.val == node.val) {
                node.next = node.next.next;
            }
            node = node.next;
        }

        return head;
    }
}
