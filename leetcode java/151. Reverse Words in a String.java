/*
思路一：
存储在一个数组中，倒置数组，但是空间是O(n)
误区：本来想直接首尾交换数组，
//  for(;i < len/2;i++) {
//      String temp = strings[i];
//      strings[i] = strings[len-1-i];
//      strings[len-1-i] = temp;
//  }

//  result = String.join(" ",strings);
但是发现自己忽略了字符串中间空格多的时候，用了split(" "),会导致数组中很多“”
所以判断不是“”的时候，倒置连接了字符串
思路二：

 */
/*49ms*/
 public class Solution {
     public String reverseWords(String s) {
         String[] strings = s.split(" ");
         String result = "";
         int len = strings.length,
             i = len - 1;

         if(len == 1) {
             return strings[0];
         }

        for(;i >= 0;i--) {
            if(!strings[i].equals("")) {
                result += strings[i] + " ";
            }
        }
         return result.trim();
     }
 }
/*53ms*/
 public class Solution {
     public String reverseWords(String s) {
         String[] strings = s.split(" +");
         String result = "";
         int len = strings.length,
             i = len - 1;

         if(len == 1) {
             return strings[0];
         }

        for(;i >= 0;i--) {
                result += strings[i] + " ";
        }
         return result.trim();
     }
 }
