思路：
使用对象来存储，key-value。
key是字符，value是出现的重复次数。
遍历字符串之后得到一个key-value的对象
遍历对象得到value最大的key值。

```
function findNthNum(arr,nth){

  var obj = {},
      len = arr.length;
  for(var i = 0;i < len;i++){
    if(!obj[arr[i]]){
      obj[arr[i]] = 1;
    }else{
      obj[arr[i]] += 1;
    }
  }

  var arr = [],
      num = 0;
  //obj转换为数组
  for(var j in obj){
    arr[num] = {};
    arr[num].key = j;
    arr[num].value = obj[j];
    num++;
  }
  //arr根据value排序
  arr.sort(function compare(a,b){
      return a.value - b.value;
  });


  //寻找数组中第n大的数
  var num1 =1,
      result = [];

  for(var k = 0,len = arr.length - 1;k <= len;k++){
    if(k > 0 && arr[k].value != arr[k-1].value){
      num1++;
    }
    if(num1 == nth){
      result.push(arr[k].key);
      while(k < len-1 && arr[k].value == arr[k+1].value){
        result.push(arr[k+1].key);
        k++;
      }
      break;
    }
  }
  return result;
}
```
