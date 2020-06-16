# 第五周 回顾，总结

# 树的遍历
可以分为迭代法和递归法

- 迭代法
   - [https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/die-dai-fa-by-jason-2/](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/die-dai-fa-by-jason-2/)
- 递归法
- 其他解法
   - 颜色标记法
   - [https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/)
## 递归法
```javascript
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
## 迭代法
### 前序排列


```javascript
栈S;
p= root;
while(p || S不空){
    while(p){
        访问p节点；
        p的右子树入S;
        p = p的左子树;
    }
    p = S栈顶弹出;
}

作者：jason-2
链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/die-dai-fa-by-jason-2/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 中序排列 左根右


```javascript
栈S;
p= root;
while(p || S不空){
    while(p){
        p入S;
        p = p的左子树;
    }
    p = S.top 出栈;
    访问p;
    p = p的右子树;
}


链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/die-dai-fa-by-jason-2/

```


### 后序排列


```javascript
栈S;
p= root;
while(p || S不空){
    while(p){
        访问p节点；
        p的左子树入S;
        p = p的右子树;
    }
    p = S栈顶弹出;
}
结果序列逆序;


```
```javascript
栈S;
p= root;
T<节点,True/False> : 节点标记;
while(p || S不空){
    while(p){
        p入S;
        p = p的左子树;
    }
    while(S不空 且 T[S.top] = True){
        访问S.top;
        S.top出S;
    }
    if(S不空){
        p = S.top 的右子树;
        T[S.top] = True;
    }
}


```
# BFS模板


```javascript

function BFS(root){
     //如果当前是空，则返回空
    if (root == null) return null;
     //维护一个栈
    let stack = []
     //将根节点放入栈
    stack.push(root)
    while (stack.length) {
        let cur = stack.pop()
       
       // process current logic 处理当层逻辑
        let temp = cur.left
        cur.left = cur.right
        cur.right = temp
        // drill down 下探到下一层
        if(cur.left) stack.push(cur.left)
        if (cur.right) stack.push(cur.right)
        
    }
    return root
}


```
经典题目

- [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/fan-zhuan-er-cha-shu-by-leetcode/)



# 递归模板
```javascript
var invertTree = function(root) {
    //递归终止条件
    if(root==null){
        return root
    }
    //处理当前逻辑
    let item  = root.left
    root.left = root.right
    root.right = item
    //下探到下一层
    invertTree(root.left)
    invertTree(root.right)
    //清理当前层
    return root
};
```
经典题目

- [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/solution/fan-zhuan-er-cha-shu-by-leetcode/)
