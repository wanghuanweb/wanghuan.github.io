/*
Given an integer n, generate a square matrix filled with elements from 1 to n^2
in spiral order.
For example,
 Given n = 3,
You should return the following matrix: [
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
 */
 public class Solution {
     public int[][] generateMatrix(int n) {
         int[][] matrix = new int[n][n];

         int maxLoop = (n+1)/2,
             begin = 1;

         for(int i = 0;i < maxLoop;i++) {
             // (i,i)--(i,n-1-i)
             for(int j = i;j <= n-1-i;j++) {
                 matrix[i][j] = begin++;
             }
             // (i+1,n-1-i)--(m-1-i,n-1-i)
             for(int j = i+1;j <= n-1-i;j++) {
                 matrix[j][n-1-i] = begin++;
             }

             // (m-1-i,n-i-2)--(m-1-i,i)
             if(n-1-i > i) {
                 for(int j = n-i-2;j >= i;j--) {
                     matrix[n-1-i][j] = begin++;
                 }
             }

             // (m-i-2,i)--回到(i,i)
             if(n-1-i > i) {
                for(int j = n-i-2;j > i;j--) {
                     matrix[j][i] = begin++;
                 }
             }
         }

         return matrix;
     }
 }
