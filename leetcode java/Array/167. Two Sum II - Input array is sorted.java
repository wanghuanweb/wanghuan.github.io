/*
Given an array of integers that is already sorted in ascending order,
 find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that
they add up to the target, where index1 must be less than index2.
Please note that your returned answers (both index1 and index2) are not
zero-based.

You may assume that each input would have exactly one solution.

Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2

 */
/*
1.如果用两个for循环,复杂度是o(n^2)
2.一般这种排序的数组求和，两个指针，一前一后遍历一遍，复杂度是o(n^2)
 */

 public class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int len = numbers.length,
            left = 0,
            right = len - 1;

        int[] array = new int[2];

        if(len < 2) {
            return array;
        }

        while(left < right) {
            int total = numbers[left] + numbers[right];
            if(total == target) {
                array[0] = left + 1;
                array[1] = right + 1;
                return array;
            } else if(total > target) {
                right--;
            } else {
                left++;
            }
        }
        return array;
    }
}
