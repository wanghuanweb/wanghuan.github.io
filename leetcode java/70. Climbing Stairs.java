/*
思路：
其实可以用f(n) = f(n-1) + f(n-2);但是递归效率不高
本题用for循环替代递归
 */
public class Solution {
    public int climbStairs(int n) {

        int[] count = new int[n+1];

        if(n==1)
            return 1;
        if(n==2)
            return 2;

        count[0]=0;
        count[1]=1;
        count[2]=2;


        for(int i=3;i<=n;++i)
            count[i]=count[i-1]+count[i-2];

        return count[n];
    }
}
