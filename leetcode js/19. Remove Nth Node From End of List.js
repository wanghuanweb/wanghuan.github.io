// 题目说明：
// Given a linked list, remove the nth node from the end of list and return its head.
//
// For example,
//    Given linked list: 1->2->3->4->5, and n = 2.
//
//    After removing the second node from the end, the linked list becomes 1->2->3->5.

/**
 * 思路:
 * 设置两个指针fast和slow,fast先移动n步，在移动slow
 * 1.若fast移动n步时，若fast为空，则删除头结点，也就是返回head.next
 * 2.若fast不为空，两个指针一起移动，直到first指针指向最后一个节点，然后删除slow的next节点就可以
 */


 /**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */
 /**
  * @param {ListNode} head
  * @param {number} n
  * @return {ListNode}
  */
  var removeNthFromEnd = function(head, n) {

     var fast = head,
         slow = head,
         i = 0;

    if(head === null || head.next === null) {
        return null;
    }

    for(;i < n;i++) {
        fast = fast.next;
    }
    if(fast === null) {
        return head.next;
    }
    while(fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }
     slow.next = slow.next.next;
     return head;

 };
