```
*@desc: fibonacci
 *@param: count {Number}
 *@return: result {Number} 第count个fibonacci值，计数从0开始
  fibonacci数列为：[1, 1, 2, 3, 5, 8, 13, 21, 34 …]
  则getNthFibonacci(0)返回值为1
  则getNthFibonacci(4)返回值为5
```

此题应该避免使用递归的方法，因为当count较大时，递归的方法耗时较长。
故考虑使用迭代法，可以使用数组记录每一项。
但此题只需要用到前面两项，从节约空间的角度讲不需要开辟数组。

```
function getNthFibonacci(count) {
    if(count<0) return 0;
    if(count<=1) return 1;
    var first = 1;
    var second = 1;
    var third = 0;
    for(var i = 2; i <= count; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}
```
