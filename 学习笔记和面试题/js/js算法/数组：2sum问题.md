数组排序，两个指针i，j前后遍历
arr[i]+arr[j]=sum则指针前后移动
arr[i]+arr[j]<sum则i后移动，否则j前移动

```
function sum(arr,target){
    var i = 0,
        j = arr.length - 1,
        sum,
        obj = {};
    arr.sort();

    while(i < j){
        sum = arr[i] +arr[j];
        if(sum === target){
            obj[arr[i]] = arr[j];
            i++;
            j--;
        }
        if(sum < target){
            i++;
        }
        else{
            j--;
        }
    }
    return obj;
}
console.log(sum([1,2,3,4,5,6,7],8));
```
