public class Solution {
    public int singleNumber(int[] nums) {

        Map<Integer,Integer> map = new HashMap<Integer,Integer>();
        int len = nums.length,
            num = 0;

        for(int i = 0 ;i < len;i++) {
            if(!map.containsKey(nums[i])) {
                map.put(nums[i],1);
            } else {
                int count = map.get(nums[i]);
                count++;
                map.put(nums[i],count);
            }
        }

        for(Map.Entry<Integer,Integer> entry:map.entrySet()) {
            if(entry.getValue() == 1) {
                num = entry.getKey();
            }
        }

        return num;
    }
}
