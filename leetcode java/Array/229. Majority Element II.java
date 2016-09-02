/*
Given an integer array of size n, find all elements that appear
more than ⌊ n/3 ⌋ times.
The algorithm should run in linear time and in O(1) space.
 */
 public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        List<Integer> list = new ArrayList<Integer>();
        Map<Integer,Integer> map = new HashMap<Integer,Integer>();

        int len = nums.length;
        int m = len/3;

        for(int num:nums) {
            if(!map.containsKey(num)) {
                map.put(num,1);
            } else {
                int count = map.get(num);
                count++;
                map.put(num,count);
            }
        }

        for(Map.Entry<Integer,Integer> entry:map.entrySet()) {
            if(entry.getValue() > m) {
                list.add(entry.getKey());
            }
        }
        return list;
    }
}
