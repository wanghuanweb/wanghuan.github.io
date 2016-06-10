/*
本题明显用递归：
递归就是把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解
本题就是用递归，也就是判断每个字符应该是(还是)
left>0时----字符串中添加字符(
right>0且left<right----字符串中添加字符)
left和right=0时----字符串被添加到list中
 */
public class Solution {
    public List<String> generateParenthesis(int n) {
        ArrayList<String> list = new ArrayList<String>();
        String s = "";

        parenthesis(list,s,n,n);

        return list;
    }

    public void parenthesis(ArrayList<String> list,String s,Integer left,Integer right) {
        if(left == 0 && right == 0) {
            list.add(s);
        }

        if(left > 0) {
            parenthesis(list,s+'(',left-1,right);
        }
        if(right > 0 && left < right) {
            parenthesis(list,s+')',left,right-1);
        }
    }
}
