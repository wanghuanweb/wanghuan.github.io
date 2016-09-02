/*
You are given an n x n 2D matrix representing an image.
Rotate the image by 90 degrees (clockwise).
Follow up:
 Could you do this in-place?
 */
/*
思路：
本题要求不开辟新的空间，且矩阵行列相同
其实就是
1.先对角线做转置(左下到右上)
2.在竖直中心轴对称交换
 */
 public class Solution {
     public void rotate(int[][] matrix) {
         int len = matrix.length;
        //  先对角线做转置(左下到右上)
         for(int i = 0;i < len;i++) {
             for(int j = 0;j < i;j++) {
                 int temp = matrix[i][j];
                 matrix[i][j] = matrix[j][i];
                 matrix[j][i] = temp;
             }
         }
        //  在竖直中心轴对称交换
        for(int i = 0;i < len;i++) {
            for(int j = 0;j < len/2;j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][len-1-j];
                matrix[i][len-1-j] = temp;
            }
        }
     }
 }
