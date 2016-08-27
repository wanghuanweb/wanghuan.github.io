/*
方法一：
排序之后遍历数组
方法二：
数学方法(较快1ms)
比如[0,1,3]就是1+2+3-数组和
 */
public class Solution {
    public int missingNumber(int[] nums) {
        int len = nums.length,
            result = 0,
            i = 0;

        Arrays.sort(nums);

        for(;i < len;i++) {
            if(nums[i] != i) {
                result = i;
                break;
            }
        }

        return i;
    }
}

public class Solution {
    public int missingNumber(int[] nums) {
        int len = nums.length,
            total = 0,
            sum = 0,
            i = 1;

        for(;i <= len;i++) {
            total += i;
            sum += nums[i - 1];
        }

        return total - sum;
    }
}
