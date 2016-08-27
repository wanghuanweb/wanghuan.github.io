public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> list = new ArrayList<List<Integer>>();
        int len = nums.length,
            total = 0;

        Arrays.sort(nums);

        for(int i = 0;i < len - 3;i++) {
            // 这个不能有了，要考虑负数，因为target可能是负数
            // if(nums[i] > target) {
            //     break;
            // }
            if(i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            for(int j = i+1;j < len - 2;j++) {
                if(j > i+1 && nums[j] == nums[j-1]) {
                    continue;
                }
                int begin = j + 1,
                    end = len - 1;

                while(begin < end) {
                    total = nums[i] + nums[j] + nums[begin] + nums[end];

                    if(total == target) {
                        List<Integer> list1 = new ArrayList<Integer>();
                        list1.add(nums[i]);
                        list1.add(nums[j]);
                        list1.add(nums[begin]);
                        list1.add(nums[end]);
                        list.add(list1);

                        int temp1 = nums[begin],
                            temp2 = nums[end];

                        while(temp1 == nums[begin] && begin < end) {
                            begin++;
                        }
                        while(temp2 == nums[end] && begin < end) {
                            end--;
                        }
                    }else if(total > target) {
                        end--;
                    }else{
                        begin++;
                    }
                }
            }
        }

        return list;
    }
}
