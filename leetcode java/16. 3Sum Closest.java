/*
思路：
先升序排序，然后用第一重for循环确定第一个数字。
然后在第二重循环里，第二、第三个数字分别从两端往中间扫。
如果三个数的total等于target，返回target。
如果三个数的total大于0，所以第三个数往左移。
如果三个数的total小于0，说明需要减小，所以第二个数往右移，
这时更新closeTarget
时间复杂度：O(n2)
 */
public class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int len = nums.length,
            closeTarget = 0,
            minReduce = 0,
            total = 0,
            i = 0;

        Arrays.sort(nums);
        closeTarget = nums[0] + nums[1] + nums[2];
        minReduce = Math.abs(closeTarget - target);

        for(;i < len;i++) {
            int j = i+1,
                k = len-1;

            while(j < k) {
                total = nums[i] + nums[j] + nums[k];

                if(total > target) {
                    k--;
                } else if(total < target){
                    j++;
                } else{
                    return target;
                }

                if(minReduce > Math.abs(total - target)) {
                    minReduce = Math.abs(total - target);
                    closeTarget = total;
                }

            }
        }

        return closeTarget;
    }
}
