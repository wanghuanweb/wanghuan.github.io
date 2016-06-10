/*
思路：
先创建一个头结点，免得要对头结点特殊处理接下来就是每次取两个链表前面较小的元素，
直到有链表到达结尾。最后再将没有到达结尾的链表直接链接到合并的链表的后面，
并返回合并后链表头后面的节点指针即可。
 */
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {

        ListNode l3 = new ListNode(-1);
        ListNode head = l3;

        if(l1 == null || l2 == null) {
            return l1 == null ? l2 : l1;
        }

        while(l1 != null && l2 != null) {
            if(l1.val < l2.val) {
                l3.next = l1;
                l1 = l1.next;
            } else{
                l3.next = l2;
                l2 = l2.next;
            }
            l3 = l3.next;
        }
        if(l1 != null) {
            l3.next = l1;
        }
        if(l2 != null) {
            l3.next = l2;
        }
        return head.next;
    }
}
