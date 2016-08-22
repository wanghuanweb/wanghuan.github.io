/*
Determine whether an integer is a palindrome回文数. Do this without extra space.
翻转整数，然后看翻转的数是否等于此数
且注意负数都返回false
 */

 public class Solution {
      public boolean isPalindrome(int x) {
          long num = 0;
          int num1 = x;

          if(x < 0){
              return false;
          }
          while(x != 0){
              num = num * 10 + x % 10;
              x = x/10;
          }
          if(num >= Integer.MAX_VALUE || num <= Integer.MIN_VALUE) {
              return false;
          } else if((int)num == num1){
              return true;
          } else{
              return false;
          }
      }
  }
