/*
思路：
转换成字符数组，排序两个字符串，直接比较看是否完全相等
 */
public class Solution {
    public boolean isAnagram(String s, String t) {

        char[] ch1 = s.toCharArray(),
               ch2 = t.toCharArray();

        int len1 = s.length(),
            len2 = t.length();

        if(len1 != len2) {
            return false;
        }

        Arrays.sort(ch1);
        Arrays.sort(ch2);

        for(int i = 0;i < len1;i++) {
            if(ch1[i] != ch2[i]) {
                return false;
            }
        }

        return true;
    }
}
