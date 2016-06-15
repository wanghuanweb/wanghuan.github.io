/*
思路：
1.先处理最后的空格，跳过空格
2.倒着遍历字符串，不为空是conut++，但是空则break
 */
public class Solution {
    public int lengthOfLastWord(String s) {
        int len = s.length(),
            i = len - 1,
            count = 0;

        while(i >= 0 && s.charAt(i) == ' ') {
            i--;
        }

        for(;i >= 0;i--) {
            char ch = s.charAt(i);
            if(ch != ' ') {
                count++;
            } else {
                break;
            }
        }
        return count;
    }
}
