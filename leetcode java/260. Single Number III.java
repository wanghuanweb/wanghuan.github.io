public class Solution {
    public int[] singleNumber(int[] nums) {
        Map<Integer,Integer> map = new HashMap<Integer,Integer>();
        int len = nums.length,
            len1 = 0;
        int[] result = new int[2];

        for(int i = 0;i < len;i++) {
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
                if(len1 == 0) {
                    result[0] = entry.getKey();
                    len1 = 1;
                } else {
                    result[1] = entry.getKey();
                }
            }
        }

        return result;
    }
}
