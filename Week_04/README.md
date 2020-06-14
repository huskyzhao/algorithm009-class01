

# 深度优先搜索、广度优先搜索
## 搜索遍历


- 每个节点都要访问一次
- 每个节点仅仅要访问一次
- 对于节点的访问顺序不限
   - 深度优先：depth first search
   - 广度优先：breadth first search



## DFS 代码模板
### 递归写法
```python
visited = set() 
def dfs(node, visited):
    if node in visited: # terminator
    	# already visited 
    	return 
	visited.add(node) 
	# process current node here. 
	...
	for next_node in node.children(): 
		if next_node not in visited: 
			dfs(next_node, visited)
```
### **非递归写法**
```python
def DFS(self, tree): 
	if tree.root is None: 
		return [] 
	visited, stack = [], [tree.root]
	while stack: 
		node = stack.pop() 
		visited.add(node)
		process (node) 
		nodes = generate_related_nodes(node) 
		stack.push(nodes) 
	# other processing work 
	...
```
## BFS 代码模板
```python
# Python
def BFS(graph, start, end):
    visited = set()
	queue = [] 
	queue.append([start]) 
	while queue: 
		node = queue.pop() 
		visited.add(node)
		process(node) 
		nodes = generate_related_nodes(node) 
		queue.push(nodes)
	# other processing work 
	...
```
# 贪心算法
## 概念
贪心算法是一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果是全局最好或最优的算法。


贪心算法与动态规划的不同在于**它对每个子问题的解决方案都做出选择，不能回退**。动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。


贪心法可以解决一些最优化问题，如：求图中的最小生成树、求哈夫曼编码等。然而对于工程和生活中的问题，贪心法一般不能得到我们所要求的答案。


一旦一个问题可以通过贪心法来解决，那么贪心法一般是解决这个问题的最好办法。由于贪心法的高效性以及其所求得的答案比较接近最优结果，贪心法也可以用作辅助算法或者直接解决一些要求结果不特别精确的问题。


## 适用贪心算法的场景


简单地说，问题能够分解成子问题来解决，子问题的最优解能递推到最终问题的最优解。这种子问题最优解称为最优子结构。


贪心算法与动态规划的不同在于它对每个子问题的解决方案都做出选择，不能回退。动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。
## 难点
贪心法的难处在于如何证明贪心法是最优解以及如何贪心计算，是否需要转换问题等，有时候从前向后，有时候是从后往前；
# 二分查找
## 二分查找的前提


1. 目标函数单调性（单调递增或者递减）
1. 存在上下界（bounded）
1. 能够通过索引访问（index accessible)



PS:在面试中，最好表现出自己的思考过程，比如先叙述考虑满足以上三个条件，再写代码；
## 代码模版
```python
# Python
left, right = 0, len(array) - 1 
while left <= right: 
	  mid = (left + right) / 2 
	  if array[mid] == target: 
		    # find the target!! 
		    break or return result 
	  elif array[mid] < target: 
		    left = mid + 1 
	  else: 
		    right = mid - 1
```
![](/image/Week_04/1.png)
