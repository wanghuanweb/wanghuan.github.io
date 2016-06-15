/*
思路：
1.先创建个newHead，以免head值为val还要特殊处理
2.两个指针pre和cur，一样的就删除不一样的就next
 */
public class Solution {
    public ListNode removeElements(ListNode head, int val) {
        // 创建个新head，以免head值为val还要特殊处理
        ListNode newHead = new ListNode(-1);
        newHead.next = head;

        ListNode pre = newHead;
        ListNode cur = head;

        while(cur != null) {
            if(cur.val == val) {
                pre.next = cur.next;
            } else {
                pre = pre.next;
            }
            cur = cur.next;
        }
        return newHead.next;
    }
}
