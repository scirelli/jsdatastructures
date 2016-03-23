/**Heap sort
* Heap represented in an array
* root of tree is first element in the array (i=0)
* parent(i) = floor( i/2 )
* left(i) = 2i+1
* right(i) = 2i + 2
*  0   1  2  3  4  5  6  7  8
* [ 15, 3, 7, 1, 7, 0, 8, 5, 44 ]
*
*                          ( )0
*                    ( )1        ( )2
*               ( )3     ( )4 ( )5   ( )6
*           ( )7   ( )8
*
* Max Heap
* The key of a node is >= the keys of it's children.
*
* Min Heap
* The key of a node is <= the keys of it's children.
*
*
* A binary heap is a heap data structure created using a binary tree.
*
* binary tree has two rules -
* 1. Binary Heap has to be complete binary tree at all levels except the last level. This is called shape property.
* 2. All nodes are either greater than equal to (Max-Heap) or less than equal to (Min-Heap) to each of its child nodes. This is called heap prop­erty.
* Implementation:
*   Use array to store the data.
*   Start storing from index 1, not 0.
*   For any given node at position i:
*       Its Left Child is at [2*i+1] if available.
*       Its Right Child is at [2*i+2] if available.
*       Its Parent Node is at [floor((i-1)/2)]if available.
*/

var MaxHeap = function(){
    function right( i ){
        return 2*i+2;
    };
    function left( i ){
        return 2*i+1;
    };
    function parent( i ){
        return Math.floor( (i-1)/2 );
    };
    function swap( array, a, b ){
        var tmp = 0;
        tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    };
    //Correct a single violation of the heap property in a subtree's root.
    //Assume that the tree's rooted at left(i) and right(i) are max heeps.
    function maxHeapify( a, i ){//O(log(n))
        var lft  = left(i),
            rght = right(i),
            largest = i;
 
        if( lft < a.length && a[lft] > a[largest] ){
            largest = lft;
        }
        if( rght < a.length && a[rght] > a[largest] ){
            largest = rght;
        }
        if( largest != i ){
            swap(a, i, largest );
            maxHeapify( a, largest );
        }
    };
    
    //Convert A[1...n] into a max-heap.
    // A[n/2 +1 ... n] are all leaves
    function buildMaxHeap( array ){
        for( var i=Math.floor((array.length-1)/2); i>=0; i-- ){
            maxHeapify(array, i);
        }
    };

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };
    function randFill( array ){
        for( var i=0,l=array.length; i<l; array[i++] = randRange(0,l) );
    };

    function test( array ){
        var a = [6,7,0,4,0,8,18,9,1,3];
        console.log("Original array: " + a);
        buildMaxHeap( a );
        for(var i=0, l=a.length; i<l; i++ ){         
            console.log("Sorted array: " + a);
            console.log('Max: ' + a[0] + '\n');
            a[0] = a.pop();
            maxHeapify(a,0);
        }
    }

    return {
        left:left,
        right:right,
        parent:parent,
        buildMaxHeap:buildMaxHeap,
        test:{
            unitTest:test,
            randFill:randFill
        }
    }
}();
MaxHeap.test.unitTest();
