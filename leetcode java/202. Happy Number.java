/*
思路：
使用递归的思路比较简单。
但是需要注意小于10的数中，1和7都是happy number，容易忽略7，可以验证一下
 */
public class Solution {
    public boolean isHappy(int n) {
        int m = 0;

        if(n == 1 || n == 7) {
            return true;
        }
        if(n < 10) {
            return false;
        }
        while(n > 0) {
            m += (n % 10) * (n % 10);
            n = n/10;
        }
        return isHappy(m);
    }
}
