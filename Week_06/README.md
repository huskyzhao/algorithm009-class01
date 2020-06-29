
这个讲得很明了，多看几遍

[https://labuladong.gitbook.io/algo/dong-tai-gui-hua-xi-lie](https://labuladong.gitbook.io/algo/dong-tai-gui-hua-xi-lie)
# 分治 + 回溯 + 递归 + 动态规划
## 递归代码模版
```python
public void recur(int level, int param) {
     // terminator
     if (level > MAX_LEVEL) {
     // process result
     return;
     }
     // process current logic
     process(level, param);
     // drill down
     recur( level: level + 1, newParam);
     // restore current status

}
```
## 分治代码模板
```python
def divide_conquer(problem, param1, param2, ...):
    # recursion terminator
    if problem is None:
         print_result
         return
    # prepare data
     data = prepare_data(problem)
     subproblems = split_problem(problem, data)
    # conquer subproblems
     subresult1 = self.divide_conquer(subproblems[0], p1, ...)
     subresult2 = self.divide_conquer(subproblems[1], p1, ...)
     subresult3 = self.divide_conquer(subproblems[2], p1, ...)
    …
    # process and generate the final result
     result = process_result(subresult1, subresult2, subresult3, …)

     # revert the current level states 
```
## 小结


- 人肉递归低效、很累
- 找到最近最简方法，将其拆解成可重复解决的问题
- 数学归纳法思维（抵制人肉递归的诱惑）



本质：寻找重复性 —> 计算机指令集


# 动态规划
## 定义
1. Wiki 定义： [https://en.wikipedia.org/wiki/Dynamic_programming](https://en.wikipedia.org/wiki/Dynamic_programming)
2. “Simplifying a complicated problem by breaking it down into simpler sub-problems” (in a recursive manner)“通过将复杂问题分解为更简单的子问题来简化问题” (以递归方式)
3. Divide & Conquer + Optimal substructure 分治 + 最优子结构


## 关键点
动态规划 和 递归或者分治 没有根本上的区别（关键看有无最优的子结构）


共性：找到重复子问题
差异性：最优子结构、中途可以淘汰次优解


## 动态规划关键点


1. 最优子结构 opt[n] = best_of(opt[n-1], opt[n-2], …)
2. 储存中间状态：opt[i]
3. 递推公式（美其名曰：状态转移方程或者 DP 方程）
Fib: opt[i] = opt[n-1] + opt[n-2]
二维路径：opt[i,j] = opt[i+1][j] + opt[i][j+1] (且判断a[i,j]是否空地）


## 动态规划小结


- 打破自己的思维惯性，形成机器思维
- 理解复杂逻辑的关键
- 也是职业进阶的要点要领



## 如何列出正确的状态转移方程？


1. 确定 base case，这个很简单，显然目标金额 amount 为 0 时算法返回 0，因为不需要任何硬币就已经凑出目标金额了。
2. **确定「状态」，也就是原问题和子问题中会变化的变量**。由于硬币数量无限，硬币的面额也是题目给定的，只有目标金额会不断地向 base case 靠近，所以唯一的「状态」就是目标金额 amount。
3. **、确定「选择」，也就是导致「状态」产生变化的行为**。目标金额为什么变化呢，因为你在选择硬币，你每选择一枚硬币，就相当于减少了目标金额。所以说所有硬币的面值，就是你的「选择」。
4. **明确 dp 函数/数组的定义**。我们这里讲的是自顶向下的解法，所以会有一个递归的 dp 函数，一般来说函数的参数就是状态转移中会变化的量，也就是上面说到的「状态」；函数的返回值就是题目要求我们计算的量。就本题来说，状态只有一个，即「目标金额」，题目要求我们计算凑出目标金额所需的最少硬币数量。所以我们可以这样定义 dp 函数：
    * dp(n) 的定义：输入一个目标金额 n，返回凑出目标金额 n 的最少硬币数量。




## 动态规划解题思路

1. 暴力法解题
1. 使用字典表剪枝，在暴力法上面做优化 dpfunction** 自顶向下**
1. 使用dptable **自底向上** 动态规划
   1. 先确定base case
   1. 确定状态
   1. 确定「选择」，也就是导致「状态」产生变化的行为
   1. 列出状态转移方程
4. 使用滚动数组



## 如何找到动态规划的状态转移关系


1. 明确 dp 数组所存数据的含义。这一步对于任何动态规划问题都很重要，如果不得当或者不够清晰，会阻碍之后的步骤。
2. 根据 dp 数组的定义，运用数学归纳法的思想，假设 dp[0...i-1] 都已知，想办法求出 dp[i]，一旦这一步完成，整个题目基本就解决了。
但如果无法完成这一步，很可能就是 dp 数组的定义不够恰当，需要重新定义 dp 数组的含义；或者可能是 dp 数组存储的信息还不够，不足以推出下一步的答案，需要把 dp 数组扩大成二维数组甚至三维数组。
