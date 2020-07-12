# 位运算


## 位运算符



| 含义  | 运算符  | 示例 |
| --- | --- | --- |
| 左移  | << | 0011 => 0110 |
| 右移 | >> | 0110 => 0011 |
| 按位或  | ︳ | 0011
-------=> 1011
1011 |
| 按位与  | & | 0011
-------=> 0011
1011 |
| 按位取反 | ~  | 0011 => 1100 |
| 按位异或（相同为零不同为一）  | ^ | 0011
-------=> 1000
1011 |
|  |  |  |

## 指定位置的位运算

1. 将x 最右边的 n 位清零：x& (~0 << n)
1. 获取x 的第 n 位值（0 或者1）： (x >> n) & 1
1. 获取x 的第 n 位的幂值：x& (1 <<n)
1. 仅将第 n 位置为1：x | (1 << n)
1. 仅将第 n 位置为0：x & (~ (1 << n))
1. 将x 最高位至第 n 位（含）清零：x& ((1 << n) -1)
1. 将第 n 位至第0 位（含）清零：x& (~ ((1 << (n + 1)) -1))
## 实战位运算要点


• 判断奇偶：
x % 2 == 1 —> (x & 1) == 1
x % 2 == 0 —> (x & 1) == 0
• x >> 1 —> x / 2.
即： x = x / 2; —> x = x >> 1;
mid = (left + right) / 2; —> mid = (left + right) >> 1;
• X = X & (X-1) 清零最低位的 1
• X & -X => 得到最低位的 1
• X & ~X => 0


用过1，2


# 布隆过滤器
一个很长的二进制向量和一系列随机映射函数。布隆过滤器可以用于检索一个元素是否在一个集合中。
优点是空间效率和查询时间都远远超过一般的算法，
缺点是有一定的误识别率和删除困难。


判断一个元素为true,则可能存在，如果判断为false,则一定不存在
![](/image/Week_08/1.png)


![](/image/Week_08/2.png)
## 实现
```javascript
/**
 * BoolmFilter
 * maxKeys：最大数量
 * errorRate：错误率
 *
 */
function BoolmFilter (maxKeys, errorRate) {
  // 布隆过滤器位图映射变量
  this.bitMap = [];
  // 布隆过滤器中最多可放的数量
  this.maxKeys = maxKeys;
  // 布隆过滤器错误率
  this.errorRate = errorRate;
  // 位图变量的长度，需要根据maxKeys和errorRate来计算
  this.bitSize = Math.ceil(maxKeys * (-Math.log(errorRate) / (Math.log(2) * Math.log(2)) ));
  // 哈希数量
  this.hashCount = Math.ceil(Math.log(2) * (this.bitSize / maxKeys));
  // 已加入元素数量
  this.keyCount = 0;

  // 初始化位图数组
  // for (let i = Math.ceil(this.bitSize / 31) - 1; i >=0; i--) {
  //   this.bitMap[i] = 0;
  // }
}

/**
 * 设置位
 *
 */
BoolmFilter.prototype.bitSet = function (bit) {
  // this.bitMap |= (1<<bit);
  // bitSize
  let numArr = Math.floor(bit / 31),
      numBit = Math.floor(bit % 31);
  this.bitMap[numArr] |= (1<<numBit);
  // this.bitMap[bit] = 1;
}

/**
 * 读取位
 *
 */
BoolmFilter.prototype.bitGet = function (bit) {
  // return this.bitMap &= (1<<bit);
  let numArr = Math.floor(bit / 31),
      numBit = Math.floor(bit % 31);
  return this.bitMap[numArr] &= (1<<numBit);
  // return this.bitMap[bit];
}

/**
 * 加入布隆过滤器
 *
 */
BoolmFilter.prototype.add = function (key) {
  if (this.contain(key)) {
    return -1;
  }

  let hash1 = MurmurHash(key, 0, 0),
      hash2 = MurmurHash(key, 0, hash1);  
  
  for (let i = 0; i < this.hashCount; i++) {
    this.bitSet(Math.abs( Math.floor((hash1 + i * hash2) % (this.bitSize)) ));  
  }  
  
  this.keyCount++;
}

/**
 * 检测是否已经存在
 *
 */
BoolmFilter.prototype.contain = function (key) {
  let hash1 = MurmurHash(key, 0, 0),
      hash2 = MurmurHash(key, 0, hash1);  
  
  for (let i = 0; i < this.hashCount; i++) {  
    if ( !this.bitGet(Math.abs( Math.floor((hash1 + i * hash2) % (this.bitSize)) )) ) {
      return false;
    }  
  }

  return true;
}
```
## 案例

1. 比特币网络
1. 分布式系统（Map-Reduce） — Hadoop、search engine
1. Redis 缓存
1. 垃圾邮件、评论等的过滤

科普：[https://www.cnblogs.com/cpselvis/p/6265825.html](https://www.cnblogs.com/cpselvis/p/6265825.html)
[https://blog.csdn.net/tianyaleixiaowu/article/details/74721877](https://blog.csdn.net/tianyaleixiaowu/article/details/74721877)
## 参考链接

- [布隆过滤器的原理和实现](https://www.cnblogs.com/cpselvis/p/6265825.html)
- [使用布隆过滤器解决缓存击穿、垃圾邮件识别、集合判重](https://blog.csdn.net/tianyaleixiaowu/article/details/74721877)
- [布隆过滤器 Python 代码示例](https://shimo.im/docs/UITYMj1eK88JCJTH)
- [布隆过滤器 Python 实现示例](https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/)
- [高性能布隆过滤器 Python 实现示例](https://github.com/jhgg/pybloof)
- [布隆过滤器 Java 实现示例 1](https://github.com/lovasoa/bloomfilter/blob/master/src/main/java/BloomFilter.java)
- [布隆过滤器 Java 实现示例 2](https://github.com/Baqend/Orestes-Bloomfilter)
# LRU Cache
[https://leetcode-cn.com/problems/lru-cache/solution/ping-zi-jun-qian-duan-jin-jie-suan-fa-lru-shi-xian/](https://leetcode-cn.com/problems/lru-cache/solution/ping-zi-jun-qian-duan-jin-jie-suan-fa-lru-shi-xian/)
## 实现
```javascript
var LRUCache = function(capacity) {
    this.keys = []
    this.cache = Object.create(null)
    this.capacity = capacity
};

LRUCache.prototype.get = function(key) {
    if(this.cache[key]) {
        // 调整位置
        remove(this.keys, key)
        this.keys.push(key)
        return this.cache[key]
    }
    return -1
};

LRUCache.prototype.put = function(key, value) {
    if(this.cache[key]) {
        // 存在即更新
        this.cache[key] = value
        remove(this.keys, key)
        this.keys.push(key)
    } else {
        // 不存在即加入
        this.keys.push(key)
        this.cache[key] = value
        // 判断缓存是否已超过最大值
        if(this.keys.length > this.capacity) {
            removeCache(this.cache, this.keys, this.keys[0])
        }
    }
};

// 移除 key
function remove(arr, key) {
    if (arr.length) {
        const index = arr.indexOf(key)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

// 移除缓存中 key
function removeCache(cache, keys, key) {
    cache[key] = null
    remove(keys, key)
}

```
## 参考链接

- [Understanding the Meltdown exploit](https://www.sqlpassion.at/archive/2018/01/06/understanding-the-meltdown-exploit-in-my-own-simple-words/)
- [替换算法总揽](https://en.wikipedia.org/wiki/Cache_replacement_policies)
- [LRU Cache Python 代码示例](https://shimo.im/docs/CoyPAyXooGcDuLQo)
## 实战题目 / 课后作业

- [LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/#/)（亚马逊、字节跳动、Facebook、微软在半年内面试中常考）
# 排序
## 排序算法

1. 比较类排序：
通过比较来决定元素间的相对次序，由于其时间复杂度不能突破
O(nlogn)，因此也称为非线性时间比较类排序。
1. 非比较类排序：
不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时
间下界，以线性时间运行，因此也称为线性时间非比较类排序。



![](/image/Week_08/3.png)
![](/image/Week_08/4.png)


## 初级排序 - O(n^2)


1. 选择排序（Selection Sort）
   1. 每次找最小值，然后放到待排序数组的起始位置。
2. 插入排序（Insertion Sort）
   1. 从前到后逐步构建有序序列；对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
3. 冒泡排序（Bubble Sort）
   1. 嵌套循环，每次查看相邻的元素如果逆序，则交换。
## 高级排序 - O(N*LogN)

- 快速排序（Quick Sort）
   - 数组取标杆 pivot，将小元素放 pivot左边，大元素放右侧，然后依次对右边和右边的子数组继续快排；以达到整个序列有序。
- 归并排序（Merge Sort）— 分治
   1. 把长度为n的输入序列分成两个长度为n/2的子序列；
   1. 对这两个子序列分别采用归并排序；
   1. 将两个排序好的子序列合并成一个最终的排序序列。



归并 和 快排 具有相似性，但步骤顺序相反


归并：先排序左右子数组，然后合并两个有序子数组
快排：先调配出左右子数组，然后对于左右子数组进行排序




- 堆排序（Heap Sort） — 堆插入 O(logN)，取最大/小值 O(1)
   1. 数组元素依次建立小顶堆
   1. 依次取堆顶元素，并删除
## 特殊排序 - O(n)

-  计数排序（Counting Sort）
   - 计数排序要求输入的数据必须是有确定范围的整数。将输入的数据值转化为键存储在额外开辟的数组空间中；然后依次把计数大于 1 的填充回原数组
-  桶排序（Bucket Sort）
   - 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。
-  基数排序（Radix Sort）
   - 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
## 排序动画
[https://www.cnblogs.com/onepixel/p/7674659.html](https://www.cnblogs.com/onepixel/p/7674659.html)
[https://www.bilibili.com/video/av25136272](https://www.bilibili.com/video/av25136272)
[https://www.bilibili.com/video/av63851336](https://www.bilibili.com/video/av63851336)


## 代码实现
### 快速排序
快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
####  算法描述
快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：

- 从数列中挑出一个元素，称为 “基准”（pivot）；
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
```javascript
function quickSort(arr, left, right) {
    varlen = arr.length,
        partitionIndex,
        left = typeofleft != 'number'? 0 : left,
        right = typeofright != 'number'? len - 1 : right;
 
    if(left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    returnarr;
}
 
function partition(arr, left ,right) {     // 分区操作
    varpivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for(vari = index; i <= right; i++) {
        if(arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }       
    }
    swap(arr, pivot, index - 1);
    returnindex-1;
}
 
function swap(arr, i, j) {
    vartemp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```


### 归并排序
归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。 
#### 算法描述

- 把长度为n的输入序列分成两个长度为n/2的子序列；
- 对这两个子序列分别采用归并排序；
- 将两个排序好的子序列合并成一个最终的排序序列。
```javascript
function mergeSort(arr) {
    varlen = arr.length;
    if(len < 2) {
        returnarr;
    }
    varmiddle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    returnmerge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right) {
    varresult = [];
 
    while(left.length>0 && right.length>0) {
        if(left[0] <= right[0]) {
            result.push(left.shift());
        } else{
            result.push(right.shift());
        }
    }
 
    while(left.length)
        result.push(left.shift());
 
    while(right.length)
        result.push(right.shift());
 
    returnresult;
}
```
## 参考链接

- [十大经典排序算法](https://www.cnblogs.com/onepixel/p/7674659.html)
- [快速排序代码示例](https://shimo.im/docs/TX9bDbSC7C0CR5XO)
- [归并排序代码示例](https://shimo.im/docs/sDXxjjiKf3gLVVAU)
- [堆排序代码示例](https://shimo.im/docs/M2xfacKvwzAykhz6)
