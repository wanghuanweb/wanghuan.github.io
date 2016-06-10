/*
思路：
用HashMap动态存储字符串的每个不重复的子字符串；
当有重复字符出现时，动态更新子字符串的最大值和更新HashMap
 */
public class Solution {
    public int lengthOfLongestSubstring(String s) {

        HashMap<Character,Integer> map = new HashMap<Character,Integer>();
        int removeStart = 0,
            max = 0,
            i = 0;

        for(;i < s.length();i++) {
            char ch = s.charAt(i);
            if(!map.containsKey(ch)) {
                map.put(ch,i);
            } else{
                max = Math.max(max,map.size());
                while(map.containsKey(ch)) {
                    map.remove(s.charAt(removeStart));
                    removeStart++;
                }
                map.put(ch,i);
            }
        }
        // 当字符串无重复时，max还是0，则需要更新
        max = Math.max(max, map.size());
        return max;
    }
}
