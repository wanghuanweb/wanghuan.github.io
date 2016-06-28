/*
思路：
1.当0的个数大于等于2时，返回全为0的数组
2.当0的个数为1时，0对应的返回total，其他的为0
3.当无0时，total处于当前数
 */
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int len = nums.length,
            total = nums[0],
            flag = 0,
            i = 1;

        int[] result = new int[len];

        for(;i < len;i++) {
            if(nums[i] == 0) {
                flag++;
                if(flag >= 2) {
                    return result;
                }
            }
            if(nums[i] != 0) {
                total = total * nums[i];
            }
        }

        for(i = 0;i < len;i++) {
            if(nums[i] != 0 && flag == 1) {
                result[i] = 0;
            } else if(nums[i] != 0 && flag == 0) {
                result[i] = total/nums[i];
            } else{
                result[i] = total;
            }
        }

        return result;
    }
}
