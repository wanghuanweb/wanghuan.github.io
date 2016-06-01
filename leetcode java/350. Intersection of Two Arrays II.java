import java.util.*;

public class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
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
                i++;
                j++;
            }else if(nums1[i] > nums2[j]) {
                j++;
            }else {
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
