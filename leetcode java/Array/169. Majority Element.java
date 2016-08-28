/*
Given an array of size n, find the majority element. The majority
element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element
always exist in the array.

 */
public class Solution {
    public int majorityElement(int[] nums) {
        int len = nums.length,
            m = (len % 2 == 0)?len/2:(len/2 + 1);

        if(len < 3) {
            return nums[0];
        }

        HashMap<Integer,Integer> map = new HashMap<Integer,Integer>();

        for(int key:nums) {
            if(!map.containsKey(key)) {
                map.put(key,1);
            }else{
                int count = map.get(key);
                count++;
                if(count >= m) {
                    return key;
                }
                map.put(key,count);
            }
        }

        return 0;
    }
}
