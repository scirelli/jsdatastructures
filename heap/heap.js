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
module.exports = function Heap() {
    function right( i ) {
        return 2*i+2;
    }
    function left( i ) {
        return 2*i+1;
    }
    function parent( i ) { //eslint-disable-line no-unused-vars
        return Math.floor( (i-1)/2 );
    }
    function swap( array, a, b ) {
        var tmp = 0;
        tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    }

    function pop(array, comparator) {
        let rtn = array[0],
            tmp = array.pop();

        if(array.length) {
            array[0] = tmp;
            heapify(array, 0, comparator);
        }

        return rtn;
    }

    //Correct a single violation of the heap property in a subtree's root.
    //Assume that the tree's rooted at left(i) and right(i) are max heeps.
    //O(log(n))
    function maxHeapify( a, i ) {
        var lft  = left(i),
            rght = right(i);

        if( !(lft >= a.length || lft < 0) ) {
            if( a[lft] > a[i] ) {
                swap(a, lft, i);
                maxHeapify( a, lft );
            }
        }

        if( !(rght >= a.length || rght < 0) ) {
            if( a[rght] > a[i] ) {
                swap( a, rght, i );
                maxHeapify( a, rght );
            }
        }
    }

    function minHeapify( a, i ) {
        var lft  = left(i),
            rght = right(i);

        if( !(lft >= a.length || lft < 0) ) {
            if( a[lft] < a[i] ) {
                swap(a, lft, i);
                minHeapify( a, lft );
            }
        }
        if( !(rght >= a.length || rght < 0) ) {
            if( a[rght] < a[i] ) {
                swap( a, rght, i );
                minHeapify( a, rght );
            }
        }
    }

    //O(log(n))
    function heapify( a, i, comparator = (a, b)=>a-b ) {
        var lft  = left(i),
            rght = right(i);

        if( !(lft >= a.length || lft < 0) ) {
            if( comparator(a[lft], a[i]) < 0) {
                swap(a, lft, i);
                heapify( a, lft );
            }
        }
        if( !(rght >= a.length || rght < 0) ) {
            if( comparator(a[rght], a[i]) < 0 ) {
                swap( a, rght, i );
                heapify( a, rght );
            }
        }
    }

    //Convert A[1...n] into a max-heap.
    // A[n/2 +1 ... n] are all leaves
    function buildMaxHeap( array ) {
        for( var i=(~~(array.length/2))-1; i>=0; i-- ) {
            maxHeapify(array, i);
        }

        return array;
    }

    function buildMinHeap( array ) {
        for( var i=(~~(array.length/2))-1; i>=0; i-- ) {
            minHeapify(array, i);
        }
        return array;
    }

    function buildHeap(array, comparator) {
        for( var i=(~~(array.length>>1))-1; i>=0; i-- ) {
            heapify(array, i, comparator);
        }

        return array;
    }

    function randRange( min, max ) {
        return ~~(Math.random()*((max-min)+1) + min);
    }
    function randFill( array ) {
        for( var i=0, l=array.length; i<l; array[i++] = randRange(0, l) );
    }
    function test() {
        let array = new Array(100);

        randFill(array);
        array = [1, 2, 3, 4, 5, 6];
        console.log('Original array: ' + array + '\n');

        let maxA = buildMaxHeap(array.slice(0));
        console.log('Max sorted array: ' + maxA);

        let minA = buildMinHeap(array.slice(0));
        console.log('Min sorted array: ' + minA);

        console.log('\n');

        minA = buildHeap(array.slice(0), (a, b)=>a-b);
        console.log('Min sorted array: ' + minA);

        let cmp = (a, b)=>b-a;
        maxA = buildHeap(array.slice(0), cmp);
        console.log('Max sorted array: ' + maxA);
        let v = pop(maxA, cmp)
        while(v) {
            heapify(maxA, 0, cmp);
            console.log('Max sorted array: ' + maxA);
            v = pop(maxA, cmp)
        }
    }

    return {
        buildMaxHeap: buildMaxHeap,
        buildMinHeap: buildMinHeap,
        test:         {
            unitTest: test,
            randFill: randFill
        },
        randRange: randRange
    };
}();
