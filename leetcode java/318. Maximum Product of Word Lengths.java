public class Solution {
    public int maxProduct(String[] words) {
        int len = words.length,
            total = 0,
            i = 0,
            j = 0;

        int[] nums = new int[len];

        for(;i < len;i++) {
            String temp = words[i];
            for(;j < temp.length();j++) {
                nums[i] |= (1 << (temp.charAt(j) - 'a'));
            }
        }

        for(i = 0;i < len;i++) {
            for(j = i + 1;j < len;j++) {
                if((nums[i] & nums[j]) == 0) {
                    total = Math.max(total,(words[i].length() * words[j].length()));
                }
            }
        }

        return total;
    }
}
