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

        if (value === this.root.value) return this.root
        
        else

    }




}
