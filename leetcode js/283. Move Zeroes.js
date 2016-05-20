/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * 思路：
 * 先找出所有的0，并将位置存储在一个数组中（因为一边遍历数组一边直接用splice删除是大忌，所以不这样，因为位置是即时改变的）
 * 然后倒叙删除相应位置的0，因为免得先删除前边，数组后边0的位置改变
 * 在往数组push几个0
 */
var moveZeroes = function(nums) {

    var len = nums.length,
        array = [],
        zeroNums = 0,
        i;

    for(i = 0;i < len;i++) {
        if(nums[i] === 0) {
            array[zeroNums++] = i;
        }
    }

    for(i = zeroNums - 1;i >= 0;i--) {
        nums.splice(array[i],1);
    }

    for(i = 0;i < zeroNums;i++) {
        nums.push(0);
    }
};
