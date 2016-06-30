/*
方法一：
用的容器map解决的问题，但是19ms
方法二：
参考别人的做法
可以给数组排序，然后判断挨着的三个是否相同
 */
public class Solution {
    public int singleNumber(int[] nums) {
        Map<Integer,Integer> map = new HashMap<Integer,Integer>();

        int len = nums.length,
            result = 0,
            i = 0;

        for(;i < len;i++) {
            if(!map.containsKey(nums[i])) {
                map.put(nums[i],1);
            } else {
                int count = map.get(nums[i]);
                count++;
                map.put(nums[i],count);
            }
        }

        for(Map.Entry<Integer,Integer> entry:map.entrySet()) {
            if(entry.getValue() != 3) {
                result = entry.getKey();
            }
        }
        return result;
    }
}
