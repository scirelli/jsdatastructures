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
    constructor() {
        this.array = [];
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

    push() {
        for(let item of arguments) {
            this.array.push(item);
            siftDown.call(0, this.array.length - 1);
        }

        return this;
    }
    unshift() {
        return this.push.apply(arguments);
    }
    insert() {
        return this.push.apply(arguments);
    }

    pop() {
    }
    shift() {
        return this.pop();
    }

    popPush(elem) {
        return elem;
    }

    static heapify(array, cmp=(a,b)=>a-b) {
        for(let i=Math.floor(array.length/2); i>=0; i--) {
            siftUp(array, i, cmp);
        }

        return array;
    }
};

function siftUp(array, elemIndex, cmp) {
}

function siftDown(array, startIndex, endIndex, cmp) {
    let item = array[startIndex],
        parentIndex;

    while(startIndex > endIndex) {
        parentIndex = getParentNodeIndex(startIndex);
        //if(cmp(array[parentIndex] 
    }
}

function getRightNodeIndex(i) {
    return (i<<1)+2;
}
function getLeftNodeIndex(i) {
    return (i<<1)+1;
}

function getParentNodeIndex(i) {
    return (i-1)>>1;
}

function swap(a, b) {
    let tmp = 0;

    tmp = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = tmp;

    return this;
}
