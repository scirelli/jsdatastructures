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
            tmp   = 0;
        if( lft >= a.length || lft < 0 ) return;
        if( rght >= a.length || rght < 0 ) return;

        if( a[lft] > a[i] ){
            swap(a, lft, i);
            maxHeapify( a, lft );
        }
        if( a[rght] > a[i] ){
            swap( a, rght, i );
            maxHeapify( a, rght );
        }       
    };
    
    //Convert A[1...n] into a max-heap.
    // A[n/2 +1 ... n] are all leaves
    function buildMaxHeap( array ){
        for( var i=(array.length/2)-1; i>=0; i-- ){
            maxHeapify(array, i);
        }
    };

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };
    function randFill( array ){
        for( var i=0,l=array.length; i<l; array[i++] = randRange(0,l) );
    };
    function test(){
        var array = new Array(100),
            mh    = new MaxHeap();
        
        randFill(array);

        console.log("Original array: " + array);
        mh.buildMaxHeap( array );
        console.log("Sorted array: " + array);
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
