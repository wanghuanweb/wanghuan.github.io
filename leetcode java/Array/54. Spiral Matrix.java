/*
Given a matrix of m x n elements (m rows, n columns), return all elements
of the matrix in spiral(螺旋) order.
For example,
 Given the following matrix:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
You should return [1,2,3,6,9,8,7,4,5].
*/
/*
思路：(横坐标就是层，纵坐标是列)
1.每螺旋一层，其实路径就是(i,i)--(i,n-1-i)--(m-1-i,n-1-i)--(m-1-i,i)--回到起点
需要注意：
1.循环的次数：这个需要注意(Math.min(m,n)+1)/2;
2.从右到左，从下到上防止重复，则需要判断
 */
 public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {

        List<Integer> list = new ArrayList<Integer>();

        int m = matrix.length;

        if(m == 0) {
            return list;
        }

        int n = matrix[0].length,
            maxLoop = (Math.min(m,n)+1)/2;

        for(int i = 0;i < maxLoop;i++) {
            // (i,i)--(i,n-1-i)
            for(int j = i;j <= n-1-i;j++) {
                list.add(matrix[i][j]);
            }
            // (i+1,n-1-i)--(m-1-i,n-1-i)
            for(int j = i+1;j <= m-1-i;j++) {
                list.add(matrix[j][n-1-i]);
            }

            // (m-1-i,n-i-2)--(m-1-i,i)
            if(m-1-i > i) {
                for(int j = n-i-2;j >= i;j--) {
                    list.add(matrix[m-1-i][j]);
                }
            }

            // (m-i-2,i)--回到(i,i)
            if(n-1-i > i) {
               for(int j = m-i-2;j > i;j--) {
                    list.add(matrix[j][i]);
                }
            }

        }
        return list;
    }
}
