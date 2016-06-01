/*
将两个数组排序之后，依次检索
这里需要注意的是：ArrayList<Integer>要加入integer，如果<>什么都不加,则会array[i] = res.get(i);报错说object不能转换成int[]
 */
import java.util.*;

public class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {

        int i = 0,
            j = 0,
            len1 = nums1.length,
            len2 = nums2.length;

        ArrayList<Integer> res = new ArrayList<Integer>();

        Arrays.sort(nums1);
        Arrays.sort(nums2);

        while(i < len1 && j < len2) {
            if(nums1[i] == nums2[j]) {
                res.add(nums1[i]);
                while(++i != len1 && nums1[i] == nums1[i-1]);
                while(++j != len2 && nums2[j] == nums2[j-1]);
            }else if(nums1[i] > nums2[j]) {
                j++;
            }else{
                i++;
            }

        }
        int[] array = new int[res.size()];

        for(i = 0;i < array.length;i++) {
            array[i] = res.get(i);
        }
        return array;
    }
}
