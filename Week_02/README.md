# 第二周总结|哈希表，映射，集合，树，二叉树，二叉搜索树，堆，二叉堆，图

## 哈希表和映射，集合


### 定义
**哈希表**（Hash table），也叫散列表，是根据关键码值（Key value）而直接进行访问的数据结构。
它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。
这个映射函数叫作**散列函数**（Hash Function），存放记录的数组叫作**哈希表**（或散列表）。


散列表用的是数组支持按照下标随机访问数据的特性，所以散列表其实就是数组的一种扩展，由数组演化而来。可以说，如果没有数组，就没有散列表。
![](/image/Week_02/1.jpeg)
### 工程实践


- 电话号码簿
- 用户信息表
- 缓存（LRU Cache）
  - 这整个过程涉及的查找操作都可以通过散列表来完成。其他的操作，比如删除头结点、链表尾部插入数据等，都可以在 O(1) 的时间复杂度内完成。所以，这三个操作的时间复杂度都是 O(1)。至此，我们就通过散列表和双向链表的组合使用，实现了一个高效的、支持 LRU 缓存淘汰算法的缓存系统原型。
  - ![](/image/Week_02/2.jpeg)
- 键值对存储（Redis）



### 实现原理


#### 哈希函数


该如何构造散列函数呢？三点散列函数设计的基本要求：

- 散列函数计算得到的散列值是一个非负整数；
- 如果 key1 = key2，那 hash(key1) == hash(key2)；
- 如果 key1 ≠ key2，那 hash(key1) ≠ hash(key2)。



#### 哈希碰撞


常用的散列冲突解决方法有两类，开放寻址法（open addressing）和链表法（chaining）。

1. 开放寻址法
开放寻址法的核心思想是，如果出现了散列冲突，我们就重新探测一个空闲位置，将其插入。

当数据量比较小、装载因子小的时候，适合采用开放寻址法。这也是 Java 中的ThreadLocalMap使用开放寻址法解决散列冲突的原因。
![](/image/Week_02/3.jpeg)
2. 链表法
在散列表中，每个“桶（bucket）”或者“槽（slot）”会对应一条链表，所有散列值相同的元素我们都放到相同槽位对应的链表中。

基于链表的散列冲突处理方法比较适合存储大对象、大数据量的散列表，而且，比起开放寻址法，它更加灵活，支持更多的优化策略，比如用红黑树代替链表。
![](/image/Week_02/4.jpeg)

完整结构
### 复杂度分析
![](/image/Week_02/5.png)
### 源码分析
Set 和Map


- [Java Set 文档](http://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Set.html)
- [Java Map 文档](http://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Map.html)





# 树、二叉树、二叉搜索树
## 定义
树
![](/image/Week_02/6.jpeg)
高度，深度，层
![](/image/Week_02/7.jpeg)
![](/image/Week_02/8.jpeg)
二叉树，顾名思义，每个节点最多有两个“叉”，也就是两个子节点，分别是左子节点和右子节点。

二叉树中，叶子节点都在最底下两层，最后一层的叶子节点都靠左排列，并且除了最后一层，其他层的节点个数都要达到最大，这种二叉树叫作**完全二叉树**。

## 关系
Linked List 是特殊化的 Tree
Tree 是特殊化的 Graph


## 如何表示（或者存储）一棵二叉树


### 链式存储法

![](/image/Week_02/9.jpeg)

### 基于数组的顺序存储法

![](/image/Week_02/10.jpeg)
## 二叉树遍历 Pre-order/In-order/Post-order


1.前序（Pre-order）：根-左-右
2.中序（In-order）：左-根-右
3.后序（Post-order）：左-右-根
![](/image/Week_02/11.jpeg)
## 递推公式
```javascript

前序遍历的递推公式：
preOrder(r) = print r->preOrder(r->left)->preOrder(r->right)

中序遍历的递推公式：
inOrder(r) = inOrder(r->left)->print r->inOrder(r->right)

后序遍历的递推公式：
postOrder(r) = postOrder(r->left)->postOrder(r->right)->print r
```
### 示例代码


```java
public class TreeNode {
    public int val;
    public TreeNode left, right;
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
```
```java
//前序遍历
void preOrder(Node* root) {
  if (root == null) return;
  print root // 此处为伪代码，表示打印root节点
  preOrder(root->left);
  preOrder(root->right);
}
//中序遍历
void inOrder(Node* root) {
  if (root == null) return;
  inOrder(root->left);
  print root // 此处为伪代码，表示打印root节点
  inOrder(root->right);
}
//后序遍历
void postOrder(Node* root) {
  if (root == null) return;
  postOrder(root->left);
  postOrder(root->right);
  print root // 此处为伪代码，表示打印root节点
}
```
## 二叉搜索树 Binary Search Tree


二叉搜索树，也称二叉搜索树、有序二叉树（Ordered Binary Tree）、排序二叉树（Sorted Binary Tree），是指一棵空树或者具有下列性质的二叉树：
1. 左子树上所有结点的值均小于它的根结点的值；
2. 右子树上所有结点的值均大于它的根结点的值；
3. 以此类推：左、右子树也分别为二叉查找树。 （这就是 重复性！）


中序遍历：升序排列


### 二叉搜索树常见操作


1. 查询
2. 插入新结点（创建）
3. 删除
Demo: [https://visualgo.net/zh/bst](https://visualgo.net/zh/bst)


## 复杂度分析


![](/image/Week_02/12.png)




# 堆和二叉堆
## 定义
### 堆
可以迅速找到一堆数中的最大或者最小值的数据结构


将根节点最大的叫做大顶堆，将根节点最小的堆叫做小顶堆
常见的堆：二叉堆，斐波拉切堆等。




不同实现的比较[https://en.wikipedia.org/wiki/Heap_(data_structure)](https://en.wikipedia.org/wiki/Heap_(data_structure))


## 二叉堆性质


通过完全二叉树来实现


二叉堆的要求：只要满足这两点，它就是一个二叉堆。

- 堆是一个完全二叉树；
- 堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。

![](/image/Week_02/13.png)

## 二叉**堆的自我调整**


对于二叉堆，如下有几种操作：
**插入节点**
**删除节点**
**构建二叉堆**

这几种操作都是基于堆的自我调整。


下面让我们以最小堆为例，看一看二叉堆是如何进行自我调整的。
**
### 1.插入节点


二叉堆的节点插入，插入位置是完全二叉树的最后一个位置。比如我们插入一个新节点，值是 0。


![](/image/Week_02/14.png)




这时候，我们让节点0的它的父节点5做比较，如果0小于5，则让新节点“上浮”，和父节点交换位置。

![](/image/Week_02/15.png)

继续用节点0和父节点3做比较，如果0小于3，则让新节点继续“上浮”。

![](/image/Week_02/16.png)

继续比较，最终让新节点0上浮到了堆顶位置。




![](/image/Week_02/17.png)




### 2.删除节点


二叉堆的节点删除过程和插入过程正好相反，所删除的是处于堆顶的节点。比如我们删除最小堆的堆顶节点1。

![](/image/Week_02/18.png)




这时候，为了维持完全二叉树的结构，我们把堆的最后一个节点10补到原本堆顶的位置。


![](/image/Week_02/19.png)




接下来我们让移动到堆顶的节点10和它的左右孩子进行比较，如果左右孩子中最小的一个（显然是节点2）比节点10小，那么让节点10“下沉”。


![](/image/Week_02/20.png)

继续让节点10和它的左右孩子做比较，左右孩子中最小的是节点7，由于10大于7，让节点10继续“下沉”。

![](/image/Week_02/21.png)




这样一来，二叉堆重新得到了调整。

### 3.构建二叉堆

构建二叉堆，也就是把一个无序的完全二叉树调整为二叉堆，本质上就是让**所有非叶子节点依次下沉**

**我们举一个无序完全二叉树的例子**
![](/image/Week_02/22.png)




首先，我们从最后一个**非叶子**节点开始，也就是从节点10开始。如果节点10大于它左右孩子中最小的一个，则节点10下沉。

![](/image/Week_02/23.png)



接下来轮到节点3，如果节点3大于它左右孩子中最小的一个，则节点3下沉。

![](/image/Week_02/24.png)

接下来轮到节点1，如果节点1大于它左右孩子中最小的一个，则节点1下沉。事实上节点1小于它的左右孩子，所以不用改变。


接下来轮到节点7，如果节点7大于它左右孩子中最小的一个，则节点7下沉。


![](/image/Week_02/25.png)




节点7继续比较，继续下沉。


![](/image/Week_02/26.png)




这样一来，一颗无序的完全二叉树就构建成了一个最小堆。

## 堆的实现


二叉堆虽然是一颗完全二叉树，但它的存储方式并不是链式存储，而是顺序存储。换句话说，二叉堆的所有节点都存储在数组当中。

![](/image/Week_02/27.jpeg)

数组中，在没有左右指针的情况下，如何定位到一个父节点的左孩子和右孩子呢？

像图中那样，我们可以依靠数组下标来计算。

假设父节点的下标是parent，那么它的左孩子下标就是 **2*parent+1**；它的右孩子下标就是**  2*parent+2 **。

![](/image/Week_02/28.png)

注意：二叉堆是堆的一种简单且常见的实现，但是并不是最优的实现
[https://en.wikipedia.org/wiki/Heap_(data_structure)](https://en.wikipedia.org/wiki/Heap_(data_structure))
![](/image/Week_02/29.png)

# 图
## 定义
![](/image/Week_02/30.png)
## 属性


图中的一个顶点可以与任意其他顶点建立连接关系。我们把这种建立的关系叫作边（edge）。
跟顶点相连接的边的条数。叫作顶点的度（degree）

我们把这种边有方向的图叫作“有向图”。以此类推，我们把边没有方向的图就叫作“无向图”。
![](/image/Week_02/31.jpeg)
把度分为入度（In-degree）和出度（Out-degree）。

顶点的入度，表示有多少条边指向这个顶点；顶点的出度，表示有多少条边是以这个顶点为起点指向其他顶点。

带权图（weighted graph）。在带权图中，每条边都有一个权重（weight）

![](/image/Week_02/32.jpeg)


## 基于图的常见算法
### DFS代码
```java
visited = set() # 和树中的DFS最大区别
def dfs(node, visited):
    if node in visited: # terminator
    # already visited
        return
	visited.add(node)
    # process current node here.
    ...
    for next_node in node.children():
        if not next_node in visited:
            dfs(next_node, visited)
```
### BFS代码
```java
def BFS(graph, start, end):
    queue = []
    queue.append([start])
    visited = set() # 和数中的BFS的最大区别
    while queue:
        node = queue.pop()
        visited.add(node)
        process(node)
        nodes = generate_related_nodes(node)
        queue.push(nodes)
```
## 图的高级算法

- 连通图个数：[ https://leetcode-cn.com/problems/number-of-islands/](https://leetcode-cn.com/problems/number-of-islands/)
- 拓扑排序（Topological Sorting）：[ https://zhuanlan.zhihu.com/p/34871092](https://zhuanlan.zhihu.com/p/34871092)
- 最短路径（Shortest Path）：Dijkstra [https://www.bilibili.com/video/av25829980?from=search&seid=13391343514095937158](https://www.bilibili.com/video/av25829980?from=search&seid=13391343514095937158)
- 最小生成树（Minimum Spanning Tree）：[ https://www.bilibili.com/video/av84820276?from=search&seid=17476598104352152051](https://www.bilibili.com/video/av84820276?from=search&seid=17476598104352152051)
