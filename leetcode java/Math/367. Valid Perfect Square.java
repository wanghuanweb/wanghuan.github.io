/*
Given a positive integer num, write a function which
returns True if num is a perfect square else False.
Example 1:
Input: 16
Returns: True

Example 2:
Input: 14
Returns: False

本题就是取平方根，然后判断得到的平方根是否是整数
 */
 public class Solution {
     public boolean isPerfectSquare(int num) {
         double num1 = Math.sqrt(num);

         if( Math.abs(num1 - Math.round(num1)) < 10e-15) {
             return true;
         } else{
             return false;
         }
     }
 }
