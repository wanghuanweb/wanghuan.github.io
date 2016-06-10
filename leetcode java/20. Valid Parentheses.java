/*
刚开始理解错题意了，哭。。下次要仔细看题
 */
 public class Solution {
     public boolean isValid(String s) {
         HashMap<Character,Integer> map = new HashMap<Character,Integer>();
         int len = s.length(),
             i = 0;

         for(;i < len;i++) {
             char ch = s.charAt(i);

             if(!map.containsKey(ch)) {
                 map.put(ch,1);
             }else {
                 int count = map.get(ch);
                 count++;
             }
         }
         if(map.get('[') == map.get(']') && map.get('(') == map.get(')') && map.get('{') == map.get('}')) {
             return true;
         } else {
             return false;
         }
     }
 }
