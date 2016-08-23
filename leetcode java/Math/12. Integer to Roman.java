/*
Given an integer, convert it to a roman numeral.
Input is guaranteed to be within the range from 1 to 3999.

 */
/*
基本字符和阿拉伯数字的对应
I-1
V-5
X-10
L-50
C-100
D-500
M-1000
（1）相同的数字连写、所表示的数等于这些数字相加得到的数、如：Ⅲ=3；
（2）小的数字在大的数字的右边、所表示的数等于这些数字相加得到的数、 如：Ⅷ=8、Ⅻ=12；
（3）小的数字、（限于 Ⅰ、X 和 C）在大的数字的左边、所表示的数等于大数减小数得到的数、如：Ⅳ=4、Ⅸ=9；
（4）正常使用时、连写的数字重复不得超过三次；
（5）在一个数的上面画一条横线、表示这个数扩大 1000 倍。
因为数字重复不得超过三次，因此数组是：
[M,CM,D,CD,C,XC,L,XL,X,IX,V,IV,I]
[1000,900,500,400,100,90,50,40,10,9,5,4,1]
 */
 public class Solution {
      public String intToRoman(int num) {
          int[] values = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
          String[] romanValues = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};

          StringBuffer string = new StringBuffer();

          for(int i = 0;i < values.length;i++) {
              while(num >= values[i]) {
                  string.append(romanValues[i]);
                  num -= values[i];
              }
          }
          return string.toString();
      }
  }
