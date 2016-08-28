/*
Given a non-negative number represented as an array of digits,
plus one to the number.

The digits are stored such that the most significant digit is
at the head of the list.

 */
public class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length-1; i >= 0; i--) {
           if (0 == i && digits[i] == 9) {
               int[] digits2 = new int[digits.length + 1];
               digits2[0] = 1;
               return digits2;
           }
           if (digits[i] == 9) {
               digits[i] = 0;
               continue;
           }
           digits[i] ++;
           break;
       }
        return digits;
    }
}
