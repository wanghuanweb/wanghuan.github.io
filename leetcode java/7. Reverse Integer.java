/*
思路：
首先，若要翻转，则循环就可以
num = num * 10 + x % 10;
x = x/10;
为了防止溢出，num定义为long
检查溢出，溢出返回0，没溢出返回num
 */
public class Solution {
    public int reverse(int x) {
        long num = 0;

        while(x != 0) {
            num = num * 10 + x % 10;
            x = x/10;
        }
        if(num >= Integer.MAX_VALUE || num <= Integer.MIN_VALUE) {
            return 0;
        }

        return (int)num;
    }
}
