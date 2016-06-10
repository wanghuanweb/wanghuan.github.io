/*
复杂度是O(n)
 */
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int len = nums.length,
            i = 0;
        ArrayList<Integer> list = new ArrayList<Integer>();
        int[] a = {-1,-1};

        for(;i < len;i++) {
            if(nums[i] == target) {
                list.add(i);
            }
        }
        if(list.size() > 0) {
            a[0] = list.get(0);
            a[1] = list.get(list.size()-1);
        }

        return a;
    }
}
/*
复杂度是O(lgn)
 */
 public class Solution {
     public int[] searchRange(int[] nums, int target) {
         int len = nums.length,
             high = len - 1,
             low = 0,
             mid = 0;

         int[] a = {-1,-1};

        // 找到目标target的位置
        // 注意三个while都是<=号，不然不ac，一些情况会错
         while(low <= high) {
             mid = (low + high)/2;
             if(nums[mid] > target) {
                 high = mid - 1;
             }else if(nums[mid] < target) {
                 low = mid + 1;
             }else{
                 break;
             }
         }

         if(target != nums[mid]) {
             return a;
         }

        // 找到此目标的最右边
         int newLow = mid,
             newHigh = len - 1;

         while(newLow <= newHigh) {
             int newMid = (newLow + newHigh)/2;
             if(target == nums[newMid]) {
                 newLow = newMid + 1;
             } else{
                 newHigh = newMid - 1;
             }
         }
         a[1] = newHigh;

         // 找到此目标的最左边
          newLow = 0;
          newHigh = mid;

          while(newLow <= newHigh) {
              int newMid = (newLow + newHigh)/2;
              if(target == nums[newMid]) {
                  newHigh = newMid - 1;
              } else{
                  newLow = newMid + 1;
              }
          }
          a[0] = newLow;

          return a;
     }
 }
