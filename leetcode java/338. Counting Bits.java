public class Solution {
    public int[] countBits(int num) {
        int[] result = new int[num+1];

        for(int i = 0 ;i < num + 1;i++) {
            result[i] = numberOfOne(i);
        }
        return result;
    }

    public int numberOfOne(int i) {
        int count = 0;
        while(i != 0) {
            if((i & 1) == 1) {
                count++;
            }
            i = i >> 1;
        }
        return count;
    }
}
