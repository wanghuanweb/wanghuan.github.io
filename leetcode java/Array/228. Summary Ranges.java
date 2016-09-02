/*
Given a sorted integer array without duplicates, return the summary of its ranges.
For example, given [0,1,2,4,5,7], return ["0->2","4->5","7"].
 */
/*
思路：
两个指针begin和end，开始时都指向0，end向后遍历:
当nums[end-1] != nums[end],则range是nums[begin]--nums[end-1]
 */
 public class Solution {
     public List<String> summaryRanges(int[] nums) {
         List<String> list = new ArrayList<String>();
         int len = nums.length,
             begin = 0,
             end = 1;

         if(len > 0 && len == nums[len - 1] - nums[0] + 1) {
             System.out.println("1");
             StringBuffer string1 = new StringBuffer();
             for(int i = 0;i < len;i++) {
                    if(i == len - 1) {
                        string1.append(nums[i]);
                    } else {
                        string1.append(nums[i]).append("->");
                    }
            }
            list.add(string1.toString());
         }
         else {
             System.out.println("2");
             System.out.println(len);
             for(;end < len;end++) {
                 if(nums[end - 1] + 1 != nums[end]) {

                    StringBuffer string = new StringBuffer();

                    for(int i = begin;i < end;i++) {
                        if(i == end - 1) {
                            string.append(nums[end]);
                        } else {
                            string.append(nums[i]).append("->");
                        }
                        System.out.println(string);
                    }
                    begin = end;
                    list.add(string.toString());
                 }
            }
         }
         return list;
     }
 }
