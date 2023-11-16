import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const createRandomArray = (lenght) => {
  const result = []

  for(let i = 0; i < lenght; i++) {
    result.push(Math.floor(Math.random() * 100))
  }
  
  console.log(result);
  return result
}


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const tree2 = new Tree([])


const tree3 = new Tree(createRandomArray(10));
prettyPrint(tree3.root)
console.log(tree3.isBalanced());
console.log('');

console.log('level order:');
console.log(tree3.levelOrder())
console.log('Pre order:');
console.log(tree3.preOrder())
console.log('in order:');
console.log(tree3.inOrder())
console.log('Post order:');
console.log(tree3.postOrder())

tree3.insert(101)
tree3.insert(120)
tree3.insert(210)
tree3.insert(300)
tree3.insert(450)
prettyPrint(tree3.root)


console.log(tree3.isBalanced());

tree3.rebalance()
prettyPrint(tree3.root)

console.log(tree3.isBalanced());

console.log('');

console.log('level order:');
console.log(tree3.levelOrder())
console.log('Pre order:');
console.log(tree3.preOrder())
console.log('in order:');
console.log(tree3.inOrder())
console.log('Post order:');
console.log(tree3.postOrder())