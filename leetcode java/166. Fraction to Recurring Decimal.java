/*
思路:
如何循环求数：每次都作除，然后取整数部分，余数*10
如何判断重复：当余数重复时，则就会是重复部分的出现，所以用hashmap存储余数(key)和索引位置，当余数(key)重复，则结束循环得到索引值方便加()
如何处理正负数：先判断符号，转换成正数
如何溢出处理：如果输入为Integer.MIN_VALUE，取绝对值后会溢出，则先转换成long

 */
 public class Solution {
     public String fractionToDecimal(int numerator, int denominator) {
         long quo = 0,
             res = 0;
         String result = "";

         // 特殊情况的处理
         if(numerator == 0) {
             return "0";
         }
         if(denominator == 0) {
             return "";
         }

         //若结果为负
         if((numerator > 0 && denominator < 0)||(numerator < 0 && denominator > 0)) {
             result += "-";
         }
         // 溢出处理并取正
         long num = numerator,
              deno = denominator;
         num = Math.abs(num);
         deno = Math.abs(deno);

         // 整数部分的处理
         quo = num / deno;
         res = (num % deno)*10;
         result += Long.toString(quo);
         if(res == 0) {
             return result;
         }

         // 小数部分的处理
         Map<Long,Integer> map = new HashMap<Long,Integer>();
         int index = 0;

         result += ".";
         while(res != 0) {
             if(map.containsKey(res)) {
                 index = map.get(res);
                 result = result.substring(0,index) + "(" + result.substring(index,result.length()) + ")";
                 return result;
             }
             map.put(res,result.length());
             quo = res / deno;
             result += Long.toString(quo);
             res = (res % deno)*10;
         }

         return result;
     }
 }
