//Heap sort
// Heap represented in an array
// root of tree is first element in the array (i=0)
//parent(i) = floor( (i-1)/2 )
//left(i) = 2i + 1
//right(i) = 2i + 2
//  0   1  2  3  4  5  6  7  8
//[ 15, 3, 7, 1, 7, 0, 8, 5, 44 ]
//
//                          ( )0
//                    ( )1        ( )2
//               ( )3     ( )4 ( )5   ( )6
//           ( )7   ( )8
//
// Max Heap
// The key of a node is >= the keys of it's children.
//
// Min Heap
// The key of a node is <= the keys of it's children.
//
module.exports = class Heap{
    constructor(a) {
        this.array = [];

        if(Array.isArray(a) && a.length) {
            this.array = Heap.heapify(a);
        }
    }

    compare(a, b) {
        return a - b;
    }

    peek() {
        return this.array[0];
    }
    top() {
        return this.peek();
    }
    front() {
        return this.peek();
    }

    clear() {
        this.array = [];
        return this;
    }
    isEmpty() {
        return !this.array.length;
    }
    get length() {
        return this.length;
    }
    size() {
        return this.length();
    }
    clone() {
        let h = new Heap();
        h.array = this.array.slice(0);
        return h;
    }
    copy(heap) {
        this.array = heap.array.slice(0);
        return this;
    }

    push(item) {
        this.array.push(item);
        siftDown(this.array, 0, this.array.length - 1, this.compare);

        return this;
    }
    unshift() {
        return this.push.apply(arguments);
    }
    insert() {
        return this.push.apply(arguments);
    }
    add() {
        return this.push.apply(arguments);
    }

    pop() {
        let lastItem = this.array.pop(),
            returnItem;

        if(this.array.length) {
            returnItem = this.array[0];
            this.array[0] = lastItem;
            siftUp(this.array, 0, this.compare);
        }else{
            returnItem = lastItem;
        }

        return returnItem;
    }
    shift() {
        return this.pop();
    }
    next() {
        if(!this.isEmpty()) {
            return {value: this.pop(), done: false};
        }

        return {done: true};
    }
    [Symbol.iterator]() { return this; }

    popPush(elem) {
        return elem;
    }

    static heapify(array, cmp=(a, b)=>a-b) {
        for(let i=Math.floor(array.length/2); i>=0; i--) {
            siftUp(array, i, cmp);
        }

        return array;
    }
};

function siftUp(array, rootIndex, cmp) {
    let endPos = array.length,
        startPos = rootIndex,
        newItem = array[rootIndex],
        leftChild = getLeftNodeIndex(rootIndex),
        rightChild;

    while(leftChild < endPos) {
        rightChild = leftChild + 1;
        if(rightChild < endPos && cmp(array[leftChild], array[rightChild]) > 0) {
            leftChild = rightChild;
        }
        array[rootIndex] = array[leftChild];
        rootIndex = leftChild;
        leftChild = getLeftNodeIndex(rootIndex);
    }
    array[rootIndex] = newItem;
    siftDown(array, startPos, rootIndex, cmp);
}

function siftDown(array, startIndex, endIndex, cmp) {
    let newItem = array[endIndex],
        parentIndex;

    while(endIndex > startIndex) {
        parentIndex = getParentNodeIndex(endIndex);
        if(cmp(newItem, array[parentIndex]) < 0) {
            swap(array, parentIndex, endIndex);
            endIndex = parentIndex;
            continue;
        }
        break;
    }
    array[endIndex] = newItem;
    return array;
}

function getRightNodeIndex(i) { // eslint-disable-line no-unused-vars
    return (i<<1)+2;
}
function getLeftNodeIndex(i) {
    return (i<<1)+1;
}

function getParentNodeIndex(i) {
    return (i-1)>>1;
}

function swap(array, a, b) {
    let tmp = 0;

    tmp = array[a];
    array[a] = array[b];
    array[b] = tmp;

    return array;
}
