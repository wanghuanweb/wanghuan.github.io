/**
 * 思路;
 * 本题目就是单链表的倒置：
 * 其实就是在遍历链表的每个节点时，把每个节点添加到新链表的头部
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
  * @return {ListNode}
  */
  var reverseList = function(head) {
      var end = null;
      var prev = null;

      while(head !== null) {
          prev = head;
          head = head.next;
          prev.next = end;
          end = prev;
      }
      return prev;
  };
