// 思路：让字符串中的元音字母倒置，那其实我们就对称交换即可。
// 如果两边都是元音字母，那么我们交换，如果左边的不是，向右移动一位，如果右边的不是，则向左移动一位

/**
 * @param {string} s
 * @return {string}
 */
// 这种方法虽然用substring让字符串两个固定位置字符调换
// 但是Memory Limit Exceeded,也就是对于超级常的字符串内存会溢出
// 从而考虑了方法二，使用split("")和join("")实现字符串和数组的相互转换，从而操作数组更方便
// 方法一：
 var reverseVowels = function(s) {
     console.log("begin function");

     var len = s.length,
         right = len - 1,
         left = 0,
         temp = 0;

    console.log(right);

     while(left < right) {
         var leftFlag = isVowels(s.charAt(left)),
             rightFlag =isVowels(s.charAt(right));
         console.log(leftFlag);
         console.log(rightFlag);

         if( leftFlag && rightFlag ) {
             console.log("1");

             temp = s.charAt(left);
             console.log(temp);

             s = s.substring(0,left) + s.charAt(right) + s.substring(left+1,right) + s.charAt(left) + s.substring(right+1,len);

             left++;
             right--;
         } else if(leftFlag) {
             console.log("2");
             right--;
         } else if(rightFlag) {
             console.log("3");
             left++;
         } else{
             console.log("4");
             left++;
             right--;
         }
     }
     return s;

 };

 function isVowels(letter){
     if ('a' == letter || 'e' == letter || 'i' == letter || 'o' == letter || 'u' == letter || 'A' == letter || 'E' == letter || 'I' == letter || 'O' == letter || 'U' == letter) {
         return true;
     }
     return false;
 }

  var s = reverseVowels("helldfyuaqwio");
  console.log(s);

// 方法二：

 var reverseVowels = function(s) {

     var array = s.split(""),
         len = array.length,
         right = len - 1,
         left = 0,
         temp;

     while(left < right) {
         var leftFlag = isVowels(array[left]),
             rightFlag = isVowels(array[right]);

         if( leftFlag && rightFlag ) {

             temp = array[left];
             array[left] = array[right];
             array[right] = temp;

             left++;
             right--;
         } else if(leftFlag) {
             right--;
         } else if(rightFlag) {
             left++;
         } else{
             left++;
             right--;
         }
     }
     s = array.join("");
     return s;

 };

 function isVowels(letter){
     if ('a' == letter || 'e' == letter || 'i' == letter || 'o' == letter || 'u' == letter || 'A' == letter || 'E' == letter || 'I' == letter || 'O' == letter || 'U' == letter) {
         return true;
     }
     return false;
 }

 var s = reverseVowels("helldfyuaqwio");
 console.log(s);
