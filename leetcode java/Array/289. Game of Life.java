/*
According to the Wikipedia's article: "The Game of Life, also known
simply as Life, is a cellular automaton devised（发明） by the British
mathematician John Horton Conway in 1970."

Given a board with m by n cells, each cell has an initial state
live (1) or dead (0). Each cell interacts with its eight neighbors
(horizontal, vertical, diagonal) using the following four rules
 (taken from the above Wikipedia article):


1.Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2.Any live cell with two or three live neighbors lives on to the next generation.
3.Any live cell with more than three live neighbors dies, as if by over-population..
4.Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


Write a function to compute the next state (after one update) of the board given
its current state.

Follow up:

1.Could you solve it in-place? Remember that the board needs to be updated
at the same time: You cannot update some cells first and then use their updated
values to update other cells.
2.In this question, we represent the board using a 2D array. In principle,
the board is infinite, which would cause problems when the active area encroaches
the border of the array. How would you address these problems?

 根据维基百科条目 Conway's Game of Life（康威生命游戏），康威生命游戏是英国数学家约翰·何顿·康威在1970年发明的细胞自动机。
 给出一个m*n的细胞矩阵，每个细胞都有一个初始状态：生存（1）或死亡（0）。每个细胞的变化都与它周围8个细胞有关，规则如下：
 1.当前细胞为存活状态时，当周围存活细胞不到2个时， 该细胞变成死亡状态。（模拟生命数量稀少）
 2.当前细胞为存活状态时，当周围有2个或3个存活的细胞时， 该细胞保持原样。
 3.当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态。（模拟生命数量过多）
 4.当前细胞为死亡状态时，当周围恰好有3个存活细胞时，该细胞变成存活状态。 （模拟繁殖）
 写一个函数，根据矩阵当前的状态，计算这个细胞矩阵的下一个状态。

 */
/*
思路：
本来想根据周围存活数-->修改当前值(0,1)-->则会影响下一个节点的值-->因此不可如此遍历
-->题目中是int矩阵，则用int矩阵
0 : 上一轮是0，这一轮过后还是0
1 : 上一轮是1，这一轮过后还是1--本来上一轮是0，下轮是1表示为1，但是这样是为了保持原样的时候写代码简单
2 : 上一轮是1，这一轮过后变为0
3 : 上一轮是0，这一轮过后变为1
因此若是0，1则之前是死亡状态；2,3则之前是存活状态
-->
最后在遍历数组解码，1和3都变成1(其实都模2即可)，0和2都变成0(其实都模2即可)
 */
 public class Solution {
     public void gameOfLife(int[][] board) {
         int row = board.length,
             col = board[0].length;

        // 遍历数组，检查每个元素的周围有几个存活元素
         for(int i = 0;i < row;i++) {
             for(int j = 0;j < col;j++) {
                 int count = neighborsBoard(board,i,j);
                // 保持原样
                if(count == 2);
                // 下一个状态是存活
                else if(count == 3){
                    board[i][j] = board[i][j]==0?3:1;
                // 下一个状态是死亡 
                }else{
                    board[i][j] = board[i][j]==1?2:0;
                }
             }
         }
        // 解码数组
        for(int i = 0;i < row;i++) {
            for(int j = 0;j < col;j++) {
                board[i][j] = board[i][j]%2;
            }
        }
     }

     private int neighborsBoard(int[][] board,int row,int col) {
         int count = 0;

         for(int i = row - 1;i <= row + 1;i++) {
             for(int j = col - 1;j <= col + 1;j++) {
                 if(i == row && j == col) {
                     continue;
                 }
                 if(i >=0 && i < board.length && j >= 0 && j < board[0].length && (board[i][j] == 1 || board[i][j] == 2)) {
                     count++;
                 }
             }
         }
         return count;
     }
 }
