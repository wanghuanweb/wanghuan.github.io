/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
/*
思路一：
遍历链表，存储在数组中，然后正序链表且数组倒叙检查。
时间复杂度：o(n),空间复杂度：o(n)
思路二：
遍历链表，利用栈先进后出的性质，把链表前半段放入栈中，逐个弹出和链表后半段比较。（当然也可以全部放入栈）
时间复杂度：o(n),空间复杂度：o(n)--用了n/2的栈空间
思路三：
反转链表法，链表前半段原地翻转，再将前半段和后半段依次比较，判断是否相等。
时间复杂度：o(n),空间复杂度：o(1)
 */
public class Solution {
    public boolean isPalindrome(ListNode head) {
        Stack<Integer> stack = new Stack<Integer>();
        ListNode node = head;

        while(node != null) {
            stack.push(node.val);
            node = node.next;
        }
        while(!stack.empty()) {
            int value = stack.pop();
            if(value != head.val) {
                return false;
            }else{
                head = head.next;
            }
        }
        return true;
    }
}

public class Solution {
    public boolean isPalindrome(ListNode head) {

        ListNode current = head;
        int count = 0;

        while(current != null) {
            count++;
            current = current.next;
        }

        int midCount = count/2;
        // 初始化current和previous和nextNode指针
        current = head;
        ListNode previous = null;
        ListNode nextNode = null;

        for(int i = 0;i < midCount;i++) {
            // 保存下一个指针
            nextNode = current.next;
            // 反转链表
            current.next = previous;
            // 更改previous和current
            previous = current;
            current = nextNode;
        }
        // 奇数的话，改变current，这样可以遍历previous和current对比
        if(count % 2 == 1) {
            current = current.next;
        }

        for(int i = 0;i < midCount;i++) {
            if (current.val != previous.val) {
                return false;
            } else {
                current = current.next;
                previous = previous.next;
            }
        }
        return true;
    }
}
