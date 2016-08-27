public class Solution {
    public int removeDuplicates(int[] nums) {

        HashMap<Integer,Integer> map = new HashMap<Integer,Integer>();

        int count = 0,
            len = 0;

        for(int key:nums) {
            if(!map.containsKey(key)) {
                map.put(key,1);
                len++;
            }else{
                count = map.get(key);
                if(count < 2){
                    count++;
                    len++;
                    map.put(key,count);
                }
            }
        }
        int j = 0;
        for(int key:map) {
            for(int i = 0;i < map.get(key);i++) {
                nums[j++];
            }
        }
        return len;
    }
}
