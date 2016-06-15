/*
这个题刚开始看没理解题意。
第1项：1
第2项：11--对第1项陈述：1个1
第3项：21--对第2项陈述：2个1
第4项：1211--对第3项陈述：1个2，1个1
第5项：111221--对第4项陈述：1个1，1个2，2个1
第6项：312211--对第5项陈述：3个1，2个2，1个1
 */
 public class Solution {
     public String countAndSay(int n) {
         String string = "";
         if(n == 1) {
             return string + 1;
         }
         
         return string;
     }
 }
