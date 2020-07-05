# 第七周|字典树和并查集，高级搜索，红黑树和AVL树

# 字典树和并查集
## 字典树 Trie
### 字典树的数据结构
树
### 基本结构


字典树，即 Trie 树，又称单词查找树或键树，是一种树形结构。典型应用是用于统计和排序大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。


它的优点是：最大限度地减少无谓的字符串比较，查询效率比哈希表高。
![](/image/Week_07/1.png)
### 基本性质
1. 结点本身不存完整单词；
2. 从根结点到某一结点，路径上经过的字符连接起来，为该结点对应的字符串；
3. 每个结点的所有子结点路径代表的字符都不相同。
### 结点存储额外信息
![](/image/Week_07/2.png)
### 结点的内部实现
![](/image/Week_07/3.png)
### 核心思想


Trie 树的核心思想是空间换时间。
利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。
### 实现一个tire树
```javascript
var TrieNode = function (val) {
    // 当前节点的值
    this.val = val
    // 当前节点是否为某个单词的最后一个字母，若是，则代表是一个单词
    this.isWord = false
    // 子节点
    this.children = new Map()
  }
  
  var Trie = function() {
    this.root = new TrieNode(null)
  };
  
  /**
   * Inserts a word into the trie. 
   * @param {string} word
   * @return {void}
   */
  Trie.prototype.insert = function(word) {
    let cur = this.root
    const len = word.length
    // 将单词插入到树中
    for (let i = 0; i < len; i++) {
      const char = word[i]
      if (!cur.children.has(char)) {
        cur.children.set(char, new TrieNode(char))
      }
      cur = cur.children.get(char)
      // 遍历到结尾的时候将 isWord 设为 true
      if (i === len - 1) {
        cur.isWord = true
      }
    }
  };
  
  /**
   * Returns if the word is in the trie. 
   * @param {string} word
   * @return {boolean}
   */
  Trie.prototype.search = function(word) {
    let cur = this.root
    for (let char of word) {
      // 如果该字符不在 children 中，说明是新单词
      if (!cur.children.has(char)) {
        return false
      }
      cur = cur.children.get(char)
    }
    // 若顺利遍历完该单词，则进行判断该单词最后一个字母所在节点的 isWord 是否为真
    // 因为存在 key(未插入) / keyword(已插入) 这种情况
    return cur.isWord
  };
  
  /**
   * Returns if there is any word in the trie that starts with the given prefix. 
   * @param {string} prefix
   * @return {boolean}
   */
  Trie.prototype.startsWith = function(prefix) {
    // 与 search 方法相比，该方法只需要判断能否成功遍历所有字符
    let cur = this.root
    for (let char of prefix) {
      if (!cur.children.has(char)) {
        return false
      }
      cur = cur.children.get(char)
    }
    return true
  };

```
## 并查集
### 适用场景

1. 组团、配对问题
1. Group or not ?
### 基本操作

-  makeSet(s)：建立一个新的并查集，其中包含 s 个单元素集合。
- unionSet(x, y)：把元素 x 和元素 y 所在的集合合并，要求 x 和 y 所在的集合不相交，如果相交则不合并。
-  find(x)：找到元素 x 所在的集合的代表，该操作也可以用于判断两个元素是否位于同一个集合，只要将它们各自的代表比较一下就可以了。
### 实现
[https://leetcode-cn.com/problems/friend-circles/solution/union-find-suan-fa-xiang-jie-by-labuladong/](https://leetcode-cn.com/problems/friend-circles/solution/union-find-suan-fa-xiang-jie-by-labuladong/)
```javascript
var findCircleNum = function (M) {
    //并查集数量
    let count = M.length;
    //创建并查集
    let parnets = Array.from(M).map((item, index) => index);
    //查找并查集
    function find(x) {
        if (parnets[x] === x) {
            return x;
        }
        return (parnets[x] = find(parnets[x]));
    }
    //合并并查集
    function union(x, y) {
        if (find(x) === find(y)) {
            return;
        }
        parnets[parnets[x]] = parnets[y];
        count--;
    }
    //主函数，合并有关联的并查集
    for (let i = 0; i < M.length; i++) {
        for (let j = i + 1; j < M[i].length; j++) {
            if (M[i][j]) {
                union(i, j);
            }
        }
    }

    return count;
};
```
# 高级搜索
## 初级搜索
1. 朴素搜索
2. 优化方式：不重复（fibonacci）、剪枝（生成括号问题）
3. 搜索方向：
DFS: depth first search 深度优先搜索
BFS: breadth first search 广度优先搜索
双向搜索、启发式搜索
## 回溯法
回溯法采用试错的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。回溯法通常用最简单的递归方法来实现，在反复重复上述的步骤后可能出现两种情况：
• 找到一个可能存在的正确的答案
• 在尝试了所有可能的分步方法后宣告该问题没有答案
在最坏的情况下，回溯法会导致一次复杂度为指数时间的计算。


## 双向 BFS
[https://leetcode-cn.com/problems/word-ladder/](https://leetcode-cn.com/problems/word-ladder/)


## 启发式搜索 Heuristic Search (A*)
## 估价函数
启发式函数： h(n)，它用来评价哪些结点最有希望的是一个我们要找的结点，h(n) 会返回一个非负实数,也可以认为是从结点n的目标结点路径的估计成本。
启发式函数是一种告知搜索方向的方法。它提供了一种明智的方法来猜测哪个邻居结点会导向一个目标。


## Shortest Path
1. BFS: 经典的BFS代码
2.A* search
估价函数：
h(current_point) = dist(current_point, destination_point)
[https://dataaspirant.com/2015/04/11/five-most-popular-similarity-](https://dataaspirant.com/2015/04/11/five-most-popular-similarity-)
measures-implementation-in-python/
3.https://leetcode.com/problems/shortest-path-in-binary-matrix/
discuss/313347/A*-search-in-Python


## [773. 滑动谜题](https://leetcode-cn.com/problems/sliding-puzzle/)
1. BFS: 经典的BFS代码:
[https://leetcode-cn.com/problems/sliding-puzzle/submissions/](https://leetcode-cn.com/problems/sliding-puzzle/submissions/)
2.A* search
估价函数：
h(current_state) = distance(current_state, target_state)
3.https://zxi.mytechroad.com/blog/searching/8-puzzles-bidirectional-astar-vs-bidirectional-bfs/


# 高级树、AVL 树和红黑树
## 二叉树遍历


- 前序(Pre-order)：根-左-右
- 中序(In-order)：左-根-右
- 后序(Post-order)：左-右-根
## 二叉搜索树 Binary Search Tree


二叉搜索树，也称二叉搜索树、有序二叉树（Ordered Binary Tree）、排序二叉树（Sorted Binary Tree），是指一棵空树或者具有下列性质的二叉树：
1. 左子树上所有结点的值均小于它的根结点的值；
2. 右子树上所有结点的值均大于它的根结点的值；
3. 以此类推：左、右子树也分别为二叉查找树。 （这就是 重复性！）
中序遍历：升序排列


## 保证性能的关键
1. 保证二维维度！ —> 左右子树结点平衡（recursively）
2.Balanced
3.https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
## AVL 树
1. 发明者 G. M. Adelson-Velsky 和 Evgenii Landis
2.Balance Factor（平衡因子）：是它的左子树的高度减去它的右子树的高度（有时相反）。balance factor = {-1, 0, 1}
3.通过旋转操作来进行平衡（四种）
4.https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree


### 旋转操作
1. 左旋
2. 右旋
3. 左右旋
4. 右左旋
### AVL 总结
1. 平衡二叉搜索树
2. 每个结点存 balance factor = {-1, 0, 1}
3. 四种旋转操作
AVL 总结
不足：结点需要存储额外信息、且调整次数频繁


## 红黑树
红黑树是一种近似平衡的二叉搜索树（Binary Search Tree），它能够确保任何一个结点的左右子树的高度差小于两倍。具体来说，红黑树是满足如下条件的二叉搜索树：
• 每个结点要么是红色，要么是黑色
• 根节点是黑色
• 每个叶节点（NIL节点，空节点）是黑色的。
• 不能有相邻接的两个红色节点
• 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。
### 关键性质
从根到叶子的最长的可能路径不多于最短的可能路径的两倍长。
