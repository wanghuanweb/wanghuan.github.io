/*
思路：
其实就是十进制转换成26进制
 */
public class Solution {
    public String convertToTitle(int n) {
        String s = "";

        while(n > 0) {
            s = (char)((n-1) % 26 + 'A') + s;
            n = (n-1)/26;
        }

        return s;
    }
}
