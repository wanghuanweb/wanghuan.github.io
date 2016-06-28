public class Solution {
    public int bulbSwitch(int n) {
        int[] bulbs = new int[n];
        int count = 0,
            i = 1;

        Arrays.fill(bulbs,1);

        for(;i < n;i++) {
            bulbs[i] = bulbs[i] & 1;
        }
        for(i = 0;i < n;i++) {
            if(bulbs[i] == 1) {
                count++;
            }
        }
        return count;
    }
}
