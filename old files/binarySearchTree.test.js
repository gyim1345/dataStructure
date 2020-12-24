
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}



class BinarySearchTree {
    constructor() {
        this.root = null;
        this.height = 0;
    }

    insert(value, root1 = this.root) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }
        if (value > root1.value) {
            if (root1.right) {
                this.insert(value, root1.right)
            } else {
                let newNode = new Node(value);
                root1.right = newNode;
                newNode.parent = root1;
                return;
            }

        }
        if (value < root1.value) {
            if (root1.left) {
                this.insert(value, root1.left)
            } else {
                let newNode = new Node(value);
                root1.left = newNode;
                newNode.parent = root1;
                return;
            }
        }
    }

    remove(value, root = this.root) {
        if (root.value === value) {
            const leftMaxNode = this.findMax(root.left);
          if(root.parent) {
            root.parent.right = leftMaxNode;
            leftMaxNode.parent = root.parent;
            
        }

            if(root.left !== leftMaxNode) {
            leftMaxNode.parent.right = leftMaxNode.left;
            leftMaxNode.right = root.right;
            leftMaxNode.left = root.left; 
            root.right.parent = leftMaxNode;
            root.left.parent = leftMaxNode;
            leftMaxNode.parent = root.parent;
            }

        } else if (root.value > value) {
            this.remove(value, root.left);
        } else if (root.value < value) {
            this.remove(value, root.right);
        }

    }

    getHeight(height = 0, root1 = this.root) {
        if (this.root === null) {
            return 0;
        }
        if (this.root && height === 0) {
            this.height = 0;
            height = 1;
        }


        if (root1.left) {
            this.getHeight(height + 1, root1.left)
        }
        if (root1.right) {
            this.getHeight(height + 1, root1.right)

        }

        this.height = Math.max(this.height, height);
        return this.height;
    }

    peakValue() {
        return this.root.value;
    }

    findMax(node) {
        if (node.right) {
            return this.findMax(node.right)
        } else {
            return node;
        }
    }

    findMin(node) {
        if (node.left) {
            return this.findMin(node.left)
        } else {
            return node;
        }
    }

    searchNode(value, root1 = this.root) {
        if (root1.value !== value) {
            return this.searchNode(value, root1.left);
        } else {
            return root1;
        }

    }
}


test('insert', () => {
    const bst = new BinarySearchTree();
    bst.insert(25);
    bst.insert(17);
    bst.insert(34);
    bst.insert(19);
    bst.insert(24);
    bst.insert(5);
    expect(bst.peakValue()).toBe(25)
    expect(bst.getHeight()).toBe(4);
})

test('findMax', () => {
    const bst = new BinarySearchTree();
    bst.insert(25);
    bst.insert(17);
    bst.insert(34);
    bst.insert(19);
    bst.insert(24);
    bst.insert(5);
    expect(bst.findMax(bst.root.left).value).toBe(24)
})

test('findMin', () => {
    const bst = new BinarySearchTree();
    bst.insert(25);
    bst.insert(17);
    bst.insert(34);
    bst.insert(19);
    bst.insert(24);
    bst.insert(5);
    expect(bst.findMax(bst.root.right).value).toBe(34)
})



describe('remove 1', () => {
test('remove1', () => {
    const bst = new BinarySearchTree();
    bst.insert(25);
    bst.insert(17);
    bst.insert(34);
    bst.insert(19);
    bst.insert(24);
    bst.insert(5);
    bst.remove(25)
    expect(bst.getHeight()).toBe(3)
})})

describe('remove 2', () => {
test('remove2', () => {
    const bst = new BinarySearchTree();
    bst.insert(25);
    bst.insert(17);
    bst.insert(34);
    bst.insert(19);
    bst.insert(24);
    bst.insert(5);
    bst.insert(26)
    bst.insert(27);
    bst.insert(23);
    bst.insert(21);
    
    expect(bst.getHeight()).toBe(6)
    
    bst.remove(24);
    
    expect(bst.getHeight()).toBe(5)
    
})
})