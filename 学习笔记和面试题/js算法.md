#### 1.js数组和js数组合并的方法？

http://blog.csdn.net/github_34514750/article/details/51049935

数组基本方法：
栈方法：push()、pop()
队列方法：push()、shift()
重排序方法：sort()、
操作方法：concat()、slice()、splice()
位置方法：indexOf()、lastIndexOf()
迭代方法：every()、some()、forEach()、filter()、map()
归并方法：reduce()、reduceRight()

http://blog.csdn.net/github_34514750/article/details/51320982

#### 2.js数组去重

其中第1种和第3种方法都用到了数组的indexOf方法。
此方法的目的是寻找存入参数在数组中第一次出现的位置。很显然，js引擎在实现这个方法的时候会遍历数组直到找到目标为止。所以此函数会浪费掉很多时间。 而第2中方法用的是hash表。把已经出现过的通过下标的形式存入一个object内。下标的引用要比用indexOf搜索数组快的多。
```
//遍历数组法
//最简单的去重方法，实现思路：新建一新数组，遍历传入数组，值不在新数组就加入该新数组中
function uniqueArray(arr) {
    var result = [],
        len = arr.length;

    for(var i = 0; i < len;i++) {
        if(n.indexOf(arr[i]) == -1) {
            result.push(arr[i]);
        }
    }
    return result;
}

//对象键值对法
//该方法执行的速度比其他任何方法都快， 就是占用的内存大一些，实现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，不是的话给对象新增该键并放入新数组。
function uniqueArray(arr) {
    var hash = {},
        result = [],
        len = arr.length;

    for(var i = 0 ;i < len;i++) {
        if(!hash[arr[i]]) {
            hash[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

//数组下标判断法
//实现思路：如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组。
function uniqueArray(arr) {
    var result = [arr[0]],
        len = arr.length;

    for(var i = 1; i < len;i++) {
        if(arr.indexOf(arr[i]) == i) {
            result.push(arr[i]);
        }
    }
    return result;
}

//先把数组排序，然后比较相邻的两个值。排序的时候用的JS原生的sort方法，JS引擎内部应该是用的快速排序吧。 最终测试的结果是此方法运行时间平均是第二种方法的三倍左右，不过比第一种和第三种方法快了不少。
function uniqueArray(arr) {
    arr.sort();
    var result = [arr[0]],
        len = array.length;

    for(var i = 0 ;i < len;i++) {
        if(arr[i] != result[result.length - 1]) {
            result.push(arr[i]);
        }
    }
}
```
