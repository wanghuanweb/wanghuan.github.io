/*
使用循环来解决，递归和迭代都是循环
递归：递归重复调用自身实现循环
迭代：循环代码中参与运算的变量同时是保存结果的变量，当前保存的结果作为下一次循环计算的初始值
普通循环：
思路一：
使用递归 1ms
思路二：
使用迭代 2ms(两种方法)
 */
 /**
  * Definition for a binary tree node.
  * public class TreeNode {
  *     int val;
  *     TreeNode left;
  *     TreeNode right;
  *     TreeNode(int x) { val = x; }
  * }
  */
 public class Solution {
     public List<Integer> preorderTraversal(TreeNode root) {
         List<Integer> list = new ArrayList<Integer>();

         if(root != null) {
             list.add(root.val);
             list.addAll(preorderTraversal(root.left));
             list.addAll(preorderTraversal(root.right));
         }
         return list;
     }
 }

 public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> list = new ArrayList<Integer>();
        Stack<TreeNode> stack = new Stack<TreeNode>();

        if(root == null) {
            return list;
        }
        stack.push(root);

        while(!stack.isEmpty()) {
            TreeNode node = stack.pop();
            list.add(node.val);

            if(node.right != null) {
                stack.push(node.right);
            }
            if(node.left != null) {
                stack.push(node.left);
            }
        }

        return list;
    }
}
/*
利用栈模拟递归过程实现先序遍历二叉树
左子树点不断的压入栈，且先访问后入栈,相当于模拟递归的先访问根节点，才是左子树，直到null，然后处理栈顶节点的右子树
但是这种方式有良好的扩展性
*/
public class Solution {
   public List<Integer> preorderTraversal(TreeNode root) {
       List<Integer> list = new ArrayList<Integer>();
       Stack<TreeNode> stack = new Stack<TreeNode>();

       while(root != null || !stack.isEmpty()) {
           //左子树点不断的压入栈
           while(root != null) {
              //先访问后入栈,相当于模拟递归的先访问根节点，才是左子树
               list.add(root.val);
               stack.push(root);
               root = root.left;
           }
           root = stack.pop();
           root = root.right;
       }

       return list;
   }
}
