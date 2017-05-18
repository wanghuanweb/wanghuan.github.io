/*
思路：
先升序排序，然后用第一重for循环确定第一个数字。
然后在第二重循环里，第二、第三个数字分别从两端往中间扫。
如果三个数的sum等于0，得到一组解。
如果三个数的sum小于0，说明需要增大，所以第二个数往右移。
如果三个数的sum大于0，说明需要减小，所以第三个数往左移。
时间复杂度：O(n^2)
注意：
但是虽然按照上述写法写出，却还是时间超出
于是考虑细节，
当第一个数>0时，直接跳出循环
当一个数和下一个数相等，则跳出本次循环
 */
public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> list = new ArrayList<List<Integer>>();

        int len = nums.length;
        Arrays.sort(nums);

        for(int i = 0;i < len-2;i++) {
            int j = i + 1,
                k = len -1,
                total = 0;

            if(nums[i]>0) {
                break;
            }
            if(i >0 && nums[i-1] == nums[i]) {
                continue;
            }
            while(j < k) {
                total = nums[i] + nums[j] +nums[k];
                if(total == 0) {
                    List<Integer> list1 = new ArrayList<Integer>();
                    int temp1 = nums[j],
                        temp2 = nums[k];

                    list1.add(nums[i]);
                    list1.add(nums[j]);
                    list1.add(nums[k]);
                    list.add(list1);

                    while(temp1 == nums[j] && j < k) {
                        j++;
                    }
                    while(temp2 == nums[k] && j < k) {
                        k--;
                    }
                }else if(total > 0) {
                    k--;
                }else{
                    j++;
                }
            }
        }
        return list;
    }
}
