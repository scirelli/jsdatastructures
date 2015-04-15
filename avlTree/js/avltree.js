//AVL Trees
// require heights of left & right children of every node to differ by at most +-1
// | Hl - Hr | <= 1
// Height of a node = length of longest path from it down to a leaf
// = max( height(left child), height(right child) ) + 1
//
// AVL trees are balanced:
//  worst case is when right subtree has height 1 more than left, for every node.
//  Nh = min # nodes in an AVl tree of height h
//  Nh = 1 + Nh-1 + Nh-2
var  AVLTree = function(){
    function Node( value ){
        this.parent = null;
        this.left   = null;
        this.right  = null;
        this.height = 0;
        this.weight = 0;
        this.value  = value;
    };
    
    //1. Simple BST insert
    //2. Fix AVL property from changed node up.
    // 
    function insert( node, value ){
        if( value <= node.value ){
            if( !node.left ){
                node.left = new Node(value);
            }else{
                insert( node.left, value );
                node.height = nodeHeight(node);
                node.weight = nodeWieght(node);
            }
        }else if( value >= node.value ){
            if( !node.right ){
                node.right = new Node(value);
            }else{
                insert(node.right, value);
                node.height = nodeHeight(node);
                node.weight = nodeWieght(node);
            }
        }
    };
    function nodeHeight( node ){
        var leftH  = node.left  ? node.left.height  : -1,
            rightH = node.right ? node.right.height : -1;
        return Math.max( leftH, rightH ) + 1;
    };
    function nodeWieght( node ){
        var leftH  = node.left  ? node.left.height  : -1,
            rightH = node.right ? node.right.height : -1;
        return Math.abs( leftH - rightH );
    }
    // You do a left rotate when the node is 'heavy' on the right
    //
    //          (x)           Left Rotate x        (y)        
    //         /   \                              /    \     
    //      /A\     (y)                         (x)     /C\
    //             /    \                      /   \        
    //           /B\    /C\                   /A\  /B\       
    //      AxByC                =          AxByC
    // In order traversal is still the same
    function leftRotate( node ){
        var nodeX = node,
            nodeY = nodeX.right;
        nodeX.right = nodeY.left;
        nodeY.left = nodeX;
        return nodeY;
    };
    // You do a right rotate when the node is 'heavy' on the left
    //
    //         (x)          Right rotate x       (x)         
    //        /    \                            /   \        
    //      (y)     /C\                      /A\     (y)        
    //     /   \                                    /    \   
    //    /A\  /B\                                /B\    /C\ 
    //      AyBxC                =          AyBxC
    // In order traversal is still the same
    function rightRotate( node ){
        var nodeX = node,
            nodeY = nodeX.left;
        nodeX.left = nodeY.right;
        nodeY.right = nodeX;
        return nodeY;
    }

    // [35,98,9,54,8,22,67,52,97,20]
    //            35 
    //        9           98
    //    8      22     54
    //         20     52 67
    //                     97

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };
    
    var unitTest = {
        testInsert:function( array ){
        }
    }
    return {
        Node:Node,
        insert:insert,
        randRange:randRange,
        unitTest:unitTest
    };
}();
