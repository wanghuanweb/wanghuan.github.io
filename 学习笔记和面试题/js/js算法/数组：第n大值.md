思路：
1.先排序数组
2.根据排序后的数组，前边和后边不同的话，则计数，当数目=第n大，则输出值。

```
function nthMax(arr,nth){

  arr.sort(function(a,b){
    return a-b;
  });

  var i = 0,
      len = arr.length,
      num = 1,
      result;

  for(;i < len;i++){
    if(i > 0 && arr[i] != arr[i-1]){
      num++;
    }
    if(num == nth){
      result = arr[i];
    }
  }
  return result;
}
```
