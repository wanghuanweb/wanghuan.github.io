// 题目说明：
// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
/**
 * 思路：
 * 先创建一个头结点，免得要对头结点特殊处理接下来就是每次取两个链表前面较小的元素，
 * 直到有链表到达结尾。最后再将没有到达结尾的链表直接链接到合并的链表的后面，
 * 并返回合并后链表头后面的节点指针即可。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
 /**
  * @param {ListNode} l1
  * @param {ListNode} l2
  * @return {ListNode}
  */
 var mergeTwoLists = function(l1, l2) {

     var head = {
         val: -1,
         next: null
         },
         merge = head;

     while(l1 && l2) {
         if(l1.val > l2.val) {
             merge.next = l2;
             l2 = l2.next;
         } else {
             merge.next = l1;
             l1 = l1.next;
         }

         merge = merge.next;
     }
     merge.next = l1 || l2;

     return head.next;
 };
