/*
思路一：
两层循环字符串，得到子字符串，随后验证字符串是否为回文需要一层循环，时间复杂度是O(n^3)
思路二：
１.遍历字符串选定中心点
２.根据中心点左右扫描，直到不是回文停止，返回长度
３.更新回文长度，最后返回最长字串
String substring(int beginIndex)
--Returns a string that is a substring of this string.
String substring(int beginIndex, int endIndex)
--Returns a string that is a substring of this string.
 */
 public class Solution {
     public String longestPalindrome(String s) {
         int len = s.length(),
             maxLen = 0,
             curLen = 0,
             beginPos = 0,
             i = 0;

         for(; i < len; i++) {
             curLen = Math.max(isPalindrome(s,i,i),isPalindrome(s,i,i+1));
             if(curLen > maxLen) {
                 beginPos = i - (curLen - 1)/2;
                 maxLen = curLen;
             }
         }
         return s.substring(beginPos,maxLen+beginPos);
     }

     public Integer isPalindrome(String s,int begin,int end) {
         while(begin >= 0 && end < s.length() && s.charAt(begin) == s.charAt(end)) {
                 begin--;
                 end++;
         }
         return end-begin-1;
     }
 }
