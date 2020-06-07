

# 知识回顾


树的解法一般都是**递归**


1. 节点的定义
1. 重复性（自相似性）



## 树的示例代码
```java
def preorder(self, root):
    if root:
         self.traverse_path.append(root.val)
         self.preorder(root.left)
         self.preorder(root.right)

def inorder(self, root):
    if root:
        self.inorder(root.left)
        self.traverse_path.append(root.val)
        self.inorder(root.right)
            
def postorder(self, root):

    if root:
         self.postorder(root.left)
         self.postorder(root.right)
         self.traverse_path.append(root.val) 
```
# 递归
递归 - 循环


通过函数体来进行的循环


## 递归思想：有去有回

- 有去：**指的是递归问题必须可以分解为若干个规模较小，与原问题形式相同的子问题，并且这些子问题可以用相同的解题思路来解决；**
- 有回：指的是这些子问题并不能无限延伸下去，他们一定有一个 `Basic Terminator`，这个终点（临界点）会阻止程序的无限循环，并让程序从这里开始往回走，逐步地解决问题。
```javascript
     |      -----------       ^ 
     |     |  递归条件  |      | 
     |      -----------       | 
     |        ⬇    ⬆          | 
 有  |      -----------       |  有
     |     |  递归条件  |      |
     |      -----------       |
     |        ⬇    ⬆          |
 去  |      -----------       |  回
     |     |  递归条件  |      |
     |      -----------       |
     |        ⬇    ⬆          |
     |      -----------       |
     |     |  非递归条件  |    |
     |     |  开始返回    |    |
     |      -----------       |
     ⬇
```
## 递归的三要素

- 明确递归终止条件(Terminator)
- 给出递归终止时的处理办法(Process)
- 提取逻辑，通过递归语句来找到子问题(Drill Down)
## 代码模板
```java
public void recur(int level, int param) {
     // terminator递归终结条件
     if (level > MAX_LEVEL) {
         // process result
         return;
     }
     // process current logic 处理当层逻辑
     process(level, param);
     // drill down 下探到下一层
     recur( level: level + 1, newParam);
     // restore current status 清理当前层

}
```
## 递归状态树
![image.png](/image/Week_03/1.png)
## 思维特点


1. 不要人肉进行递归（最大误区）
1. 找到最近最简方法，将其拆解成可重复解决的问题（重复子问题）
1. 数学归纳法思维
## 递归的场景
主要用于三类场景：

1. 问题的定义是递归的。例如阶乘、斐波那契数列；
1. 数据结构本身是递归的。例如链表和树的定义，就是典型的递归结构，所以会很适合用递归算法来解决问题；
1. 问题的解法是递归的。例如汉诺塔问题。
# 分治
![image.png](/image/Week_03/2.png)
## 分治代码模板


```java
def divide_conquer(problem, param1, param2, ...):
    # recursion terminator递归终结条件
    if problem is None:
         print_result
         return
    # prepare data 处理当前逻辑
    
     data = prepare_data(problem)
     subproblems = split_problem(problem, data)
             
    # conquer subproblems 下探到下一层
    
     subresult1 = self.divide_conquer(subproblems[0], p1, ...)
     subresult2 = self.divide_conquer(subproblems[1], p1, ...)
     subresult3 = self.divide_conquer(subproblems[2], p1, ...)
    ...
             
    # process and generate the final result 合并子问题，生成最终结果
     result = process_result(subresult1, subresult2, subresult3, …)

     # revert the current level states 移除当前层级状态
```


# 回溯
## 概念
回溯其实就是一种特殊的递归，不同的地方在于，**解决一个回溯问题，实际上就是解决一个决策树的遍历过程**。在这里，有三个概念需要厘清：

1. 路径：已经走过的路，已经做过的选择；
1. 选择列表：还可以走的路径，还可以去做的选择；
1. 结束条件：到达了决策树的底层，无法再去做选择的条件。 回溯算法的框架模板：



## 模板
### 重点：
```java
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return
    
    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
```


核心在于 `for` 循环里面的代码，事实上还可以将其扩展：
```java
for 选择 in 选择列表:
    # 做选择
    将该选择从选择列表移除
    路径.add(选择)
    backtrack(路径, 选择列表)
    # 撤销选择
    路径.remove(选择)
    将该选择再加入选择列表

```
举例来说，如下的决策树：
```java
			O
        /    |     \
      1/     |2     \3
     o       o       o  
   2/ \3   1/ \3   2/ \1
   o   o   o   o   o   o
  3|  2|  3|  1|  1|  2|
   o   o   o   o   o   o
```




每一个原点 o 都代表节点，站在这个节点上需要**做决策**，决定往哪一个路径去走。所以对于每一个节点而言，都具有两个属性：**选择列表**和**路径**。


- 例如对于最上层的节点，它的两个属性分别为：选择列表[1,2,3]，路径[]。分别代表从这个结点出发，它可以选择走三条路中的一条，但是因为事实上它还没有做出决策，所以记录的路径为空。
- 对于最右下角的节点，它的两个属性分别为：选择列表[]，路径[3,1,2]。分别代表从这个结点出发，往下做决策，已经无路可走，没有选择可以选了，所以它的选择列表为空。又因为它是从最顶层的节点一路沿着最右侧的路径走下来，所以它所记录的路径就应该是[3,1,2]。
- 当无路可走的时候，代表我们已经得到了一组解，将其加入到 ans 数组，然后回退到上一层节点，因为对于上一层节点而言，它不仅能往右走，还能往左走。退到上一层节点，即为删掉最后一个路径值，两个属性分别变成了：选择列表[2]，路径[3]。这时候只能往左走，最终得到的路径即为[3,2,1]。



理解了这些概念，那么回溯就很简单了。一言以蔽之：“**在递归之前做出选择，在递归之后撤销刚才的选择**”


## 经典题目，全排列
```java
/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    // 返回的结果
    let res = []
    backTrack(nums,[],res)
    return res
    
};
// 路径：记录在 track 中
// 选择列表：nums 中不存在于 track 的那些元素
// 结束条件：nums 中的元素全都在 track 中出现
function backTrack(nums,track,res){
     // 触发结束条件
    if(track.length==nums.length){
      res.push([...track])
        return 
    }
    for (let i = 0; i < nums.length; i++) {
         // 排除不合法的选择
       if(track.includes(nums[i])){
           continue
       }
          // 做选择
       track.push(nums[i])
        // 进入下一层决策树
       backTrack(nums,track,res)
        // 取消选择
        track.pop()
    }
}
```


