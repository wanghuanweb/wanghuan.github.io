// 题目说明：
// Given 1->2->3->4, you should return the list as 2->1->4->3.
// Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.


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
 var swapPairs = function(head) {


    if( head === null || head.next === null) {
        return head;
    }

    var temp = head.next;
    head.next = swapPairs(temp.next);
    temp.next = head;

    return temp;
};
