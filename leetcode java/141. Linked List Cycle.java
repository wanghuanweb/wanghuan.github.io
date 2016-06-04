/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
/*
思路：
方法1.可以使用hashset，重复返回true
方法2：使用两个指针，fast和slow，两个指针重合时
 */
 public class Solution {
     public boolean hasCycle(ListNode head) {
         if (head == null)
              return false;

         HashSet<ListNode> set = new HashSet<ListNode>();

         while(head!=null) {
             if(set.contains(head)) {
                 return true;
             }
             set.add(head);
             head = head.next;
         }
         return false;
     }
 }

 public class Solution {
     public boolean hasCycle(ListNode head) {
         if (head == null)
              return false;

         ListNode fast = head,
                  slow = head;

         while(true) {
             if(fast.next != null && fast.next.next!=null) {
                 fast = fast.next.next;
                 slow = slow.next;
             }else{
                 return false;
             }
             if(slow == fast) {
                 return true;
             }

         }
     }
 }
