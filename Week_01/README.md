# 第一周总结丨数组、链表、跳表、队列、栈

## ****数组Array****
![image.png](/image/Week_01/array.png)
### 时间复杂度
| 操作 | 时间复杂度 |
| :---: | :---: |
| 新增 | O(n) |
| 删除 | O(n) |
| 查找 | O(1) |
| 添加元素到数组的尾部 | O(1) |
| 添加元素到数组的头部 | O(1) |



### 创建数组
```javascript
const a = new Array(3);
const b = ['A', 'B', 'C'];
b.length // 3
```
### 查找操作
```javascript
b[0] // A
b[2] // C
```
### push-在尾部插入元素 
```javascript
const a = ['A', 'B'];
a.push('C');
a // ['A', 'B', 'C']
```
### pop-取出最后一个元素并返回


```javascript
const a = ['A', 'B'];
a.pop(); // B
a // ['A']
```
### shift 取出第一个元素并返回
```javascript
const a = ['A', 'B'];
a.shift(); // A
a // ['B']
```
### unshift-在头部添加元素
```javascript
const a = ['B'];
a.unshift('A');
a // ['A', 'B']
```
## 链表LinkedList


链表是一组节点组成的集合，每个节点都使用一个对象的引用来指向它的后一个节点。指向另一节点的引用讲做链。
![image.png](/image/Week_01/linkedList.png)
### 普通链表时间复杂度
| 操作 | 时间复杂度 |
| :---: | :---: |
| 新增 | O(1) |
| 删除 | O(1) |
| 查找 | O(n) |
| 添加元素到数组的尾部 | O(1) |
| 添加元素到数组的头部 | O(1) |



### 定义
#### 单向链表
![image.png](/image/Week_01/单向链表.png)
#### _双向链表_
此时，向链表插入一个节点就要更改节点的前驱和后继了，但是删除节点的效率提高了，不再需要寻找待删除节点的前驱节点了。
![image.png](/image/Week_01/双向链表.png)
#### 循环链表
循环链表和单链表相似，节点类型都是一样，唯一的区别是，在创建循环链表的时候，让其头节点的 next 属性执行它本身
![image.png](/image/Week_01/循环链表.png)
### 使用JS实现
* [JS中的算法与数据结构——链表(Linked-list)](https://juejin.im/entry/59cb70995188256aa423b680)
* [js实现数据结构及算法之链表(Linked-list)](https://juejin.im/post/5b87c60c6fb9a019fa06495b)
* [链表在JS中的实现](https://www.jianshu.com/p/e9620c0db523)
#### 单向链表


```javascript
//节点
function Node(element) {
    this.element = element;   //当前节点的元素
    this.next = null;         //下一个节点链接
}
//链表类
function LList () {
    this.head = new Node( 'head' );     //头节点
    this.find = find;                   //查找节点
    this.insert = insert;               //插入节点
    this.remove = remove;               //删除节点
    this.findPrev = findPrev;           //查找前一个节点
    this.display = display;             //显示链表
}
//查找给定节点

function find ( item ) {
    var currNode = this.head;
    while ( currNode.element != item ){
        currNode = currNode.next;
    }
    return currNode;
}
//插入节点

function insert ( newElement , item ) {
    var newNode = new Node( newElement );
    var currNode = this.find( item );
    newNode.next = currNode.next;
    currNode.next = newNode;
}
//显示链表元素

function display () {
    var currNode = this.head;
    while ( !(currNode.next == null) ){
        console.log( currNode.next.element );
        currNode = currNode.next;
    }
}
//查找带删除节点的前一个节点

function findPrev( item ) {
    var currNode = this.head;
    while ( !( currNode.next == null) && ( currNode.next.element != item )){
        currNode = currNode.next;
    }
    return currNode;
}
//删除节点

function remove ( item ) {
    var prevNode = this.findPrev( item );
    if( !( prevNode.next == null ) ){
        prevNode.next = prevNode.next.next;
    }
}
```




## ****跳表****
* ****[漫画：什么是跳表？](https://zhuanlan.zhihu.com/p/53975333)****
* ****[跳跃列表 维基百科](https://zh.wikipedia.org/wiki/%E8%B7%B3%E8%B7%83%E5%88%97%E8%A1%A8)****
* ****[跳表 skiplist](https://segmentfault.com/a/1190000006024984#item-3-2)****

![image.png](/image/Week_01/skiplist.png)
### 插入

1. 新节点和各层索引节点逐一比较，确定原链表的插入位置。O（logN）
1. 把索引插入到原链表。O（1）
1. 利用抛硬币的随机方式，决定新节点是否提升为上一级索引。结果为“正”则提升并继续抛硬币，结果为“负”则停止。O（logN）



总体上，**跳跃表插入操作的时间复杂度是O（logN）**，而这种数据结构所占空间是2N，既**空间复杂度是 O（N）。**
### 删除


1. 自上而下，查找第一次出现节点的索引，并逐层找到每一层对应的节点。O（logN）
1. 删除每一层查找到的节点，如果该层只剩下1个节点，删除整个一层（原链表除外）。O（logN）



总体上，跳跃表删除操作的时间复杂度是**O（logN）**。


### 思想


- 升维思想
- 空间换时间
## 工程中的应用


### LRU Cache - Linked list
* [LRU缓存算法](https://www.jianshu.com/p/b1ab4a170c3c)
* [leetcode  146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache)


### Redis - Skip List


* [跳表](https://redisbook.readthedocs.io/en/latest/internal-datastruct/skiplist.html)
* [为啥 redis 使用跳表(skiplist)而不是使用 red-black？](https://www.zhihu.com/question/20202931)


## 小结


- 数组、链表、跳表的原理和实现
- 三者的时间复杂度、空间复杂度
- 工程运用
- 跳表：升维思想 + 空间换时间



## ****参考链接****
* [数组](https://101.zoo.team/shu-zu)
* [JS中的算法与数据结构——链表(Linked-list)](https://juejin.im/entry/59cb70995188256aa423b680)
* [js实现数据结构及算法之链表(Linked-list)](https://juejin.im/post/5b87c60c6fb9a019fa06495b)
* [链表在JS中的实现](https://www.jianshu.com/p/e9620c0db523)
* [漫画：什么是跳表？](https://zhuanlan.zhihu.com/p/53975333)
* [Java 源码分析（ArrayList）](http://developer.classpath.org/doc/java/util/ArrayList-source.html)
    * [Linked List 的标准实现代码](http://www.geeksforgeeks.org/implementing-a-linked-list-in-java-using-class/)
    * [Linked List 示例代码]()
    * [Java 源码分析（LinkedList）](http://developer.classpath.org/doc/java/util/LinkedList-source.html)
*  LRU Cache - Linked list：[ LRU 缓存机制](http://leetcode-cn.com/problems/lru-cache)
* Redis - Skip List：[跳跃表](http://redisbook.readthedocs.io/en/latest/internal-datastruct/skiplist.html)、[为啥 Redis 使用跳表（Skip List）而不是使用 Red-Black？](http://www.zhihu.com/question/20202931)
## 栈Stack



| 操作 | 时间复杂度 |
| :---: | :---: |
| 新增 | O(1) |
| 删除 | O(1) |
| 查找 | O(n) |



先进后出

栈是一种特殊的列表，限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。它按照**先进后出**的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据。例如饭店里用来放盘子的，就是一种栈的结构。

![image.png](/image/Week_01/Stack.png)

由于栈具有**后入先出**的特点，因此只能访问在栈顶的元素。栈的操作主要有两种：入栈和出栈。上面的图演示了入栈和出栈的过程。

### 栈的实现


实现一个栈，可以用数组来实现，也可以用链表来实现。下面将用数组来实现。
```javascript
class Stack {
  constructor() {
    this.data = [];
    this.top = 0; // 记录栈顶位置，如果有元素进栈，该变量值随之变化
  }

  push(item) {
    this.data[this.top++] = item;
  }

  pop() {
    // 栈为空，则直接返回null
    if (this.top === 0) {
      return null;
    }
    // 返回下标为top - 1 的数组元素，并将栈中元素个数减一
    return this.data[--this.top];
  }

  clear() {
    this.top = 0;
  }

  get length() {
    return this.top;
  }
}
```


那么栈的空间、时间复杂度又分别是多少？其实很简单，我们发现储存数据只需要长度为 nnn 的数组就够了，在入栈和出栈过程中，只需要一两个临时变量存储空间，所以空间复杂度是 O(1)O(1)O(1)。
## 

## 队列Queue


![image.png](/image/Week_01/Queue.png)

| 操作 | 时间复杂度 |
| :---: | :---: |
| 新增 | O(1) |
| 删除 | O(1) |
| 查找 | O(n) |

**先进先出**

队列是一种**先进先出**的数据结构，这点和栈不一样。队列这个概念很好理解，可以想象成在食堂排队买饭吃，先到先得，后面来的排队，不允许插队。

队列的主要操作有两种：向队列中插入或删除新的元素。插入操作可以比喻成吃饭，删除操作可以比喻成(XX)。
和栈一样，队列可以用数组来实现，也可以用链表来实现。下面将用数组来实现一个队列。

```javascript
class Queue {
  constructor() {
    this.data = [];
    // head表示头部下标，tail表示尾部下标
    this.head = 0;
    this.tail = 0;
  }

  // 入队
  enqueue(item) {
    this.data[this.tail++] = item;
  }

  dequeue() {
    // 如果head == tail 表示队列为空
    if (this.head === this.tail) {
      return null;
    }
    return this.data[++this.head];
  }

  get length() {
    return this.tail - this.head;
  }
}
```


对于栈来说，一个指针就够了，但是队列需要两个指针，分别用于指向头部和尾部。

## 优先队列


按照元素的优先级取出

| 操作 | 时间复杂度 |
| :---: | :---: |
| 插入 | O(1) |
| 取出 | O(logN) |



底层具体实现的数据结构较为多样和复杂：heap,bst,treap


Java 的 PriorityQueue
[https://docs.oracle.com/javase/10/docs/api/java/util/PriorityQueue.html](https://docs.oracle.com/javase/10/docs/api/java/util/PriorityQueue.html)

## 双端队列Deque



1. 简单理解：两端可以进出的 Queue
Deque - double ended queue



| 操作 | 时间复杂度 |
| :---: | :---: |
| 新增 | O(1) |
| 删除 | O(1) |
| 查找 | O(n) |

![image.png](/image/Week_01/Deque.png)


## 复杂度分析
![image.png](/image/Week_01/commonData.png)

