/*
本题就是整数拆分求最大乘积：
1.用数学方法做
    4     4
    5     3*2
    6     3*3
    7     3*4
    8     3*3*2
    9     3*3*3
    10    3*3*4
    11    3*3*3*2
    12    3*3*3*3
    13    3*3*3*4
发现，若是3的倍数，则几个3相乘
     除以3余数是1，则*4
     除以3余数是2，则*2
 */
 public class Solution {
      public int integerBreak(int n) {
          if(n == 2) {
              return 1;
          }
          if(n == 3) {
              return 2;
          }

          int res = 1;

          while(n > 2) {//n中包含多少个3，进行相乘
              res = res * 3;
              n = n - 3;
          }
          if(n == 1){
              res = (res/3)*4;
          } else if(n == 2){
              res = res*2;
          }

          return res;
      }
  }
