/*
给一个字符串，判断括号是否匹配成功。
正确思路：
本题用栈实现
读到一个字符串时判断，如果栈顶和当前这个字符满足左右括号匹配，则弹出，否则压栈。
若最后栈顶为空，则说明匹配成功。
 */
 public class Solution {
     public boolean isValid(String s) {
         Stack<Character> stack = new Stack<Character>();
         stack.push(s.charAt(0));

         int len = s.length(),
             i = 1;

         for(;i < len;i++) {
             if(!stack.empty() && isMatch(stack.peek(),s.charAt(i))) {
                 stack.pop();
             } else {
                 stack.push(s.charAt(i));
             }
         }

         if(stack.empty()) {
             return true;
         } else {
             return false;
         }
     }

     public boolean isMatch(char a,char b) {
         if((a == '(' && b == ')') || (a == '[' && b == ']') || (a == '{' && b == '}')) {
             return true;
         } else {
             return false;
         }
     }
 }
