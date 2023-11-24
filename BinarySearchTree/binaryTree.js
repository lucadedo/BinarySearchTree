// const Node = require("./TreeNode")

class BinaryTree {
    constructor(array) {
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;

        const mid = Math.floor(sortedArray.length / 2);
        const newNode = new Node(sortedArray[mid]);

        newNode.left = this.buildTree(sortedArray.slice(0, mid));
        newNode.right = this.buildTree(sortedArray.slice(mid + 1));
        return newNode;
    };

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };

    insert(key) {
      let node = new Node(key);

      if (this.root == null) {
       this.root = node;
       return;
      };

     let prev = null;
     let temp = this.root;
     while (temp != null) {
      if(temp.data > key){
        prev = temp;
        temp = temp.left;
     }else if (temp.data < key){
      prev = temp;
       temp = temp.right;
     };

    };
    if (prev.data > key) {
      prev.left = node;
    }else{
      prev.right = node;
    }
  }

    deleteNode(key, root = this.root) {
    
    if (root === null) return root;

    if (root.data > key) { 
      root.left = this.deleteNode(key, root.left);
      return root;
    }else if (root.data < key) {
      root.right = this.deleteNode(key, root.right);
      return root;
    }else{
      if (root.left === null) {
        return root.right;
      
      }else if (root.right === null){
        return root.left;
      }

      // root.data = this.findMyNode(root.right).data;
      root.right = this.deleteNode(key,   root.data);

    }
  
    return root;
    
  };

    find(key, root = this.root) {
      const node = root;
      if (node === null) return null;
      if (node.data !== key ) {
        if (node.data < key) {
          return this.find(key, node.right);
        }else{
          return this.find(key, node.left);
        }
      }
      return node;
  };
    traversal(arr, value) {
      arr.push(value);
  };
    
    levelOrder(callback = this.traversal) {

      if (this.root === null) return [];

      let queue = [this.root];
      let results = [];

      while (queue.length !== 0) {

        let current = queue.shift(); // removes the first array element and returns it value
        callback(results, current.data);
        if(current.left !== null) queue.push(current.left);
        if(current.right !== null) queue.push(current.right);
      };
    
      return results;

  };

    inOrder() {
      let result = [];
      if (this.root === null) return; 
      function traverse(currentNode) {
        if(currentNode.left) traverse(currentNode.left)
        result.push(currentNode.data)
        if(currentNode.right) traverse(currentNode.right)
      }
      traverse(this.root)
      return result;

  };

    preOrder() {
      let result = [];
      if (this.root === null) return;
      function traverse2(currentNode) {
        result.push(currentNode.data);
        if(currentNode.left) traverse2(currentNode.left);
        if(currentNode.right) traverse2(currentNode.right);
      };
      traverse2(this.root);
      return result;
  };

    postOrder() {
      let result = [];
      if (this.root === null) return;
      function traverse3(currentNode) {
        if(currentNode.left) traverse3(currentNode.left);
        if(currentNode.right) traverse3(currentNode.right);
        result.push(currentNode.data);
      };
      traverse3(this.root)
      return result;
  };

    height(node = this.root) {

      if (node === null) return -1;

      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);

      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      } else {
        return rightHeight + 1;
      }
  };

    depth(node, root = this.root, depth = 0) {
      
    if (root === null || node === null) return;
    
    if (node === root) return `Depth: ${depth}`
    if (node.data < root.data) {
      return this.depth(node, root.left, depth += 1);
    } else {
      return this.depth(node, root.right, depth += 1);
    }
  };

    isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  };

    rebalance() {
    if (this.root === null) return;
    const inorderList = this.inOrder();
    this.root = this.buildTree(inorderList);
  };



}

class Node {
  constructor(data){
      this.data = data;
      this.left = null;
      this.right = null;
  }
}



function randomArray(num) {
  return Array.from({length: num}, () => Math.floor(Math.random() * 100));
}

const randomArr = randomArray(7);
//console.log(randomArr);
const testArr = [11,15,33,21,88,65,45,12,31];
const tree =  new BinaryTree(testArr);
console.log(tree);
tree.prettyPrint();
tree.insert(50);
tree.insert(10);
tree.insert(35);
tree.prettyPrint();


console.log(tree.height(tree.find(33)));
console.log(tree.depth(tree.find(33)));

console.log(tree.isBalanced());
console.log(tree.rebalance());
console.log(tree.isBalanced());
// tree.deleteNode(10);
// tree.prettyPrint();
// console.log(tree.find(33));

// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.postOrder());

