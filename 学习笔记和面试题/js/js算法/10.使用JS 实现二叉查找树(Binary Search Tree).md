二叉查找树/二叉搜索树/有序二叉树

二叉查找树：

1.若所有节点的左子树不空，则所有左子树节点值都小于根节点
2.若所有节点的右子树不空，则所有右子树节点值都大于根节点
3.任何节点的左右子树也都是二叉查找树

二叉查找树的优势：

相比于其他数据结构的优势在于查找、插入的时间复杂度较低，为O(log n)。

1.二叉树的查询:从根节点开始查询，循环查找若比根节点大，则查找右子树。否则，查找左子树，直到找到位置

2.二叉树的插入：首先创建一个新节点，若二叉树为空，直接创建根节点保存数据即可；若不为空，当新元素小于父节点时，根据二叉搜索树特点，需要作为父节点左子树，反之作为右子树：

3.二叉树的删除:需要考虑三种情况
    1.需要删除的节点没有子节点----只需要将从父节点指向它的链接指向null
    2.需要删除的节点只有一个子节点(左或右子树)----那么原本指向它的节点就得使其指向它的子节点
    3.需要删除的节点右两个子节点(两个子树都有)----需要在删除节点右子树上找到最小值跟要删除的节点替换，然后在将原节点删除

```
//类--Node
class Node() {
    constructor(data,left,right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

//类--BinarySearchTree
class BinarySearchTree() {
    constructor() {
        this.root = null;
    }

    //在二叉搜索树中查找节点
    find(data) {
        var currentNode = this.root;

        while(currentNode != null) {
            if(currentNode.data == data) {
                break;
            } else if(currentNode.data > data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return currentNode.data;
    }

    //在二叉搜索树中插入节点
    insert(data) {
        //创建新节点
        let newNode = new Node(data,null,null);

        //如果树根是空的，就让树根指向新创建的树节点
        if(!this.root) {
            return this.root = newNode;
        } else {
            let currentNode = this.root,
                parentNode = null;

            while(true) {
                parentNode = currentNode;

                if(currentNode.data > data) {
                    currentNode = currentNode.left;

                    if(currentNode === null) {
                        parentNode.left = newNode;
                        break;
                    }
                } else {
                    currentNode = currentNode.right;

                    if(currentNode === null) {
                        parentNode.right = newNode;
                        break;
                    }
                }
            }
        }

    }

    //在二叉搜索树中删除节点
    remove(data) {
        this.root = this.removeNode(this.root,data);
    }

    removeNode(node,data) {
        if(node == null) {
            return null;
        }

        if(node.data == data) {
            if(node.left == null && node.right == null) {
                return null;
            }
            if(node.left == null) {
                return node.right;
            }
            if(node.right == null) {
                return node.left;
            }

            let getSmallestNode = function(node) {
                while(node.left != null) {
                    node = node.left;
                }
                return node;
            }

            if(node.left != null && node.right != null) {
                let smallestNode = getSmallestNode(node.right);
                node.data = smallestNode.data;
                node.right = this.removeNode(node.right,smallsetNode.data);
                return node;
            }
        } else if(node.data > data) {
            node.left = this.removeNode(node.left,data);
            return node;
        } else {
            node.right = this.removeNode(node.right,data);
            return node;
        }
    }

}

```
