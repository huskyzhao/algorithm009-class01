# 第九周|高级动态规划，字符串算法

# 高级动态规划
## 递归、分治、回溯、动态规划复习
### 递归 - 函数自己调用自己
```java
public void recur(int level, int param) {
// terminator
if (level > MAX_LEVEL) {
// process result
return;
}
// process current logic
process(level, param);
// drill down
recur(level: level + 1, newParam);
// restore current status
}
```
### 分而治之 Divide & Conquer
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



1. 人肉递归低效、很累
1. 找到最近最简方法，将其拆解成可重复解决的问题
1. 数学归纳法思维
1. 本质：寻找重复性
### 动态规划 Dynamic Programming

1. “Simplifying a complicated problem by breaking it down intosimpler sub-problems”(in a recursive manner)
1. Divide & Conquer + Optimal substructure
   1. 分治 + 最优子结构
3. 顺推形式： 动态递推
```java
function DP():
	dp = [][] # ⼆维情况
    for i = 0 .. M {
        for j = 0 .. N {
            dp[i][j] = _Function(dp[i’][j’]…)
        }
    }
	return dp[M][N];
```
### 关键点
动态规划 和 递归或者分治 没有根本上的区别（关键看有无最优的子结构）
拥有共性：找到重复子问题
差异性：最优子结构、中途可以淘汰次优解


## 高阶的 DP 问题
### 复杂度来源

1. 状态拥有更多维度（二维、三维、或者更多、甚至需要压缩）
1. 状态方程更加复杂



本质：内功、逻辑思维、数学


dp时一个维度定义一个【】


# 字符串
## 字符串相关算法


1. [https://leetcode-cn.com/problems/to-lower-case/](https://leetcode-cn.com/problems/to-lower-case/)
1. https://leetcode-cn.com/problems/length-of-last-word/
1. https://leetcode-cn.com/problems/jewels-and-stones/
1. https://leetcode-cn.com/problems/first-unique-character-in-a-string/
1. https://leetcode-cn.com/problems/string-to-integer-atoi/
## 高级字符串算法
## 字符串匹配算法

1. 暴力法（brute force） - O(mn)
1. Rabin-Karp 算法
1. KMP 算法



课后了解：
Boyer-Moore 算法：[https://www.ruanyifeng.com/blog/](https://www.ruanyifeng.com/blog/)
2013/05/boyer-moore_string_search_algorithm.html
Sunday 算法：[https://blog.csdn.net/u012505432/article/](https://blog.csdn.net/u012505432/article/)
details/52210975


### Rabin-Karp 算法


在朴素算法中，我们需要挨个比较所有字符，才知道目标字符串中是否包含子串。那么， 是否有别的方法可以用来判断目标字符串是否包含子串呢？答案是肯定的，确实存在一种更快的方法。为了避免挨个字符对目标字符串
和子串进行比较， 我们可以尝试一次性判断两者是否相等。因此，我们需要一个好的哈希函数（hashfunction）。 通过哈希函数，我们可以算出子串的哈希值，然后将它和目标字符串中的子串的哈希值进行比较。 这个新方法在速度上比暴力法有显著提升。




Rabin-Karp 算法的思想：

1. 假设子串的长度为 M (pat)，目标字符串的长度为 N (txt)
1. 计算子串的 hash 值 hash_pat
1. 计算目标字符串txt中每个长度为 M 的子串的 hash 值（共需要计算 N-M+1次）
1.  比较 hash 值：如果 hash 值不同，字符串必然不匹配; 如果 hash 值相同，还需要使用朴素算法再次判断



### KMP 算法
KMP算法（Knuth-Morris-Pratt）的思想就是，当子串与目标字符串不匹配时，其实你已经知道了前面已经匹配成功那 一部分的字符（包括子串与目标字符串）。以阮一峰的文章为例，当空格与 D 不匹配时，你其实 知道前面六个字符是“ABCDAB”。KMP 算法的想法是，设法利用这个已知信息，不要把“搜索位置” 移回已经比较过的位置，继续把它向后移，这样就提高了效率。
[https://www.bilibili.com/video/](https://www.bilibili.com/video/)
av11866460?from=search&seid=17425875345653862171
[http://www.ruanyifeng.com/blog/2013/05/](http://www.ruanyifeng.com/blog/2013/05/)
Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
