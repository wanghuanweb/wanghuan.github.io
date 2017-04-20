使用对象来存储，key-value。
key是字符，value是出现的重复次数。
遍历字符串之后得到一个key-value的对象
遍历对象得到value最大的key值。

```
function findNthNum(arr){
  var obj = {},
      len = arr.length;

  for(var i = 0;i < len;i++){
    if(!obj[arr[i]]){
      obj[arr[i]] = 1;
    }else{
      obj[arr[i]] += 1;
    }
  }
  console.log(obj);
  var arr = [],
      num = 0;

  for(var j in obj){
    arr[num] = {};
    arr[num].key = j;
    arr[num].value = obj[j];
    num++;
  }

  arr.sort(function compare(a,b){
      return a.value - b.value;
  });

  console.log(arr);
}
```
