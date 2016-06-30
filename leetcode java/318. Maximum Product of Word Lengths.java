/*
思路：
1.整数数组来保存每个字符串的字符是否存在
2.两重循环整数数组，通过&两个数检查是否两个字符串是否有重复字符
 */
 public class Solution {
     public int maxProduct(String[] words) {
         int len = words.length,
             total = 0;

         int[] nums = new int[len];

         if(len <= 1) {
             return 0;
         }

         for(int i = 0;i < len;i++) {
            String temp = words[i];
             for(int j = 0;j < temp.length();j++) {
                 nums[i] |= (1 << (temp.charAt(j) - 'a'));
             }
         }

         for(int i = 0;i < len;i++) {
             for(int j = i + 1;j < len;j++) {
                 if((nums[i] & nums[j]) == 0) {
                     total = Math.max(total,words[i].length() * words[j].length());
                 }
             }
         }

         return total;
     }
 }
