import Node from "./node.js"

const merge = (firstArray, secondArray) => {
    let mergedArray = []

    while (firstArray.length > 0 && secondArray.length > 0) {
        firstArray[0] < secondArray[0] ? mergedArray.push(firstArray.shift()) : mergedArray.push(secondArray.shift())
    }

    firstArray.length === 0 ? mergedArray.push(...secondArray) : mergedArray.push(...firstArray)

    return mergedArray
}

const mergeSort = (array) => {
    let first_half = array.slice(0, Math.ceil(array.length / 2))
    let second_half = array.slice(Math.ceil(array.length / 2))

    if (first_half.length > 1) {
        first_half = mergeSort(first_half)
    } 

    if (second_half.length > 1) {
        second_half = mergeSort(second_half)
    }

    return merge(first_half, second_half)
}

const removeDuplicates = (data) => {
    return [...new Set(data)]
}

const arrayToBST = (arr, start, end) => {
    if ( start > end ) return null

    let mid = parseInt(( start + end ) / 2)
    let node = new Node(arr[mid])

    node.left = arrayToBST(arr, start, mid - 1)
    node.right = arrayToBST(arr, mid + 1, end)

    return node
}


export default class Tree{
    constructor(arr = []) {
        this.root = this.buildTree(arr)
    }


    buildTree(arr) {
        const sortedArray = mergeSort(arr)
        const finalArray = removeDuplicates(sortedArray) 
        const treeRoot =  arrayToBST(finalArray, 0, finalArray.length - 1)
        return treeRoot
    }
    
    insert(value) {
        this.root = this.insertRec(value, this.root) 
    }

    insertRec(value, root) {

        if (root === null) {
            root = new Node(value)
            return root
        }

        if (value === root.data) return null

        if (value < root.data) {
            if (root.left === null) root.left = new Node(value)
            else this.insertRec(value, root.left)
        }
        else {
            if (root.right === null) root.right = new Node(value)
            else this.insertRec(value, root.right)
        }

        return root
    }

    delete(value) {
        this.root = this.deleteRec(value, this.root)
    }
    
    deleteRec(value, root) {
        if (root === null) return root  
        
        if (value < root.data) {
            root.left = this.deleteRec(value, root.left)
            return root
        } else if (value > root.data) {
            root.right = this.deleteRec(value, root.right)
            return root
        }

        //reached node to delete

        // one children

        if (root.left === null) {
            let temp = root.right
            root = null
            return temp
        } else if(root.right === null) {
            let temp = root.left
            root = null
            return temp
        }

        // two chldren or more
        else {
            let succParent = root

            let succ = root.right
            while (succ.left !== null) {
                succParent = succ
                succ = succ.left
            }

            if (succParent !== root) {
                succParent.left = succ.right;
              } else {
                succParent.right = succ.right;
              }

            root.data = succ.data

            succ = null
            return root
        }
    }

    find(value) {
        if (this.root === null) return null

        return this.findRec(value, this.root)
         
    }

    findRec(value, root) {        
        if (root === null) return null
        if (value === root.data) return root

        if (value < root.data) {
            return this.findRec(value, root.left)
        } else {
            return this.findRec(value, root.right)
        }
    }
    
    levelOrder(callback = null) {
        let result = []
        let queue = []

        if (this.root === null) return result

        queue.push(this.root)

        while (queue.length > 0) {
            result.push(callback ? callback(queue[0].data) : queue[0].data)
            if (queue[0].left !== null) queue.push(queue[0].left)
            if (queue[0].right !== null) queue.push(queue[0].right)
            queue.shift()
        } 

        return result
    }

    inOrder(callback = null) {
        const result = []

        function traverse(root) {
            if (root === null) return 

            traverse(root.left)
            result.push(callback ? callback(root.data) : root.data)
            traverse(root.right)
        }

        traverse(this.root)

        return result
    }

    preOrder(callback = null) {
        const result = []

        function traverse(root) {
            if (root === null) return 
            result.push(callback ? callback(root.data) : root.data)

            traverse(root.left)
            traverse(root.right)
        }

        traverse(this.root)

        return result
    }


    postOrder(callback = null) {
        const result = []

        function traverse(root) {
            if (root === null) return 

            traverse(root.left)
            traverse(root.right)
            result.push(callback ? callback(root.data) : root.data)
        }

        traverse(this.root)

        return result
    }

    height(root = this.root) {
        if (root === null) return -1;

        let leftHeight = this.height(root.left)
        let rightHeight = this.height(root.right)

        return(1 + Math.max(leftHeight, rightHeight))
    }


    depth(node = this.root) {
        let depthCount = -1

        if (node === null || this.root === null) return depthCount;


        function traverse(node, root) {
            if (root === null) return null

            depthCount++

            if (node === root) return root
    
            if (node.data < root.data) {
                traverse(node, root.left)
            } else {
                traverse(node, root.right)
            }
        }

        traverse(node, this.root)

        return(depthCount)
    }

    isBalanced() {
        if (this.root === null) return null

        let leftHeight = this.height(this.root.left)
        let rightHeight = this.height(this.root.right)

        return (Math.abs(leftHeight - rightHeight) < 2)  
    }

    rebalance() {
        this.root = this.buildTree(this.inOrder())
    }


}
