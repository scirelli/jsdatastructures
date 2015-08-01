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
        this.left   = null;
        this.right  = null;
        this.height = 0;
        this.value  = value;
    };
    
    //1. Simple BST insert
    //2. Fix AVL property from changed node up.
    //   - suppose x is the lowest node that is violating AVL.
    //   - Assume x.right higher (heavier)
    //     - if x's right child (y) is right heavy or balanced
    //     (x)            LR(x)               (y)     
    //    /   \                              /    \   
    // /A\     (y)                         (x)     /C\
    //        /    \                      /   \       
    //      /B\    /C\                   /A\  /B\     
    //     - else if x's right child (y) is left heavy
    //            (x)            RR(y)           (z)
    //           /   \           LR(x)          /   \
    //        /A\     (y)                     (x)    (y)
    //               /    \                  /   \   /  \
    //             (z)    /D\              /A\  /B\ /C\ /D\
    //            /   \
    //           /B\  /C\
    function insert( node, value ){
        var newChild = null;
        if( value <= node.value ){
            if( !node.left ){
                node.left = new Node(value);
                node.height = nodeHeight(node);
            }else{
                newChild = insert( node.left, value );
                if( newChild ){
                    node.left = newChild;
                }
                newChild = balance(node);
                node.height = nodeHeight(node)//don't think i need this anymore;
            }
        }else if( value >= node.value ){
            if( !node.right ){
                node.right = new Node(value);
                node.height = nodeHeight(node);
            }else{
                newChild = insert(node.right, value);
                if( newChild ){
                    node.right = newChild;
                }
                newChild = balance(node);
                node.height = nodeHeight(node); //don't think i need this anymore
            }
        }
        return newChild;
    };
    function balance( node ){
        var weight = 0;
        weight = nodeWeight(node);
        if( Math.abs(weight) > 1 ){//unblanced
            if( weight > 1 ){//node is left heavy
                weight = nodeWeight(node.left);
                if( weight >= 1 || weight === 0 ){//node's left child is left heavy or balanced
                    return rightRotate(node);
                }else if( weight < 0 ){//node's left child is right heavy
                    node.left = leftRotate( node.left );
                    return rightRotate( node  );
                }
            }else if( weight < 0 ){//node is right heavy
                weight = nodeWeight(node.right);
                if( weight >= 1 || weight === 0 ){//node's right child is left heavy or balanced
                     node.right = rightRotate( node.right );
                    return leftRotate( node  );
                }else if( weight < 0 ){//node's right child is right heavy
                    return leftRotate(node);
                }
            }
        }
        return null;
    };

    function nodeHeight( node ){
        var leftH  = node.left  ? node.left.height  : -1,
            rightH = node.right ? node.right.height : -1;
        return Math.max( leftH, rightH ) + 1;
    };

    function nodeWeight( node ){
        var leftH  = node.left  ? node.left.height  : -1,
            rightH = node.right ? node.right.height : -1;
        return Math.abs(leftH - rightH);
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
        nodeX.height--;
        nodeY.height = nodeHeight(nodeY);
        return nodeY;
    };
    // You do a right rotate when the node is 'heavy' on the left
    //
    //         (x)          Right rotate x       (y)         
    //        /    \                            /   \        
    //      (y)     /C\                      /A\     (x)        
    //     /   \                                    /    \   
    //    /A\  /B\                                /B\    /C\ 
    //      AyBxC                =          AyBxC
    // In order traversal is still the same
    function rightRotate( node ){
        var nodeX = node,
            nodeY = nodeX.left;
        nodeX.left = nodeY.right;
        nodeY.right = nodeX;
        nodeX.height--;
        nodeY.height = nodeHeight(nodeY);
        return nodeY;
    }

    function minSort( node, buffer ){
        if( node.left !== null ){
            minSort( node.left, buffer );
        }
        buffer.push( node.value );
        if( node.right !== null ){
            minSort( node.right, buffer)
        }
        return buffer;
    };

    function maxSort( node, buffer ){
        if( node.right !== null ){
            maxSort( node.right, buffer)
        }
        buffer.push( node.value );
        if( node.left !== null ){
            maxSort( node.left, buffer );
        }
        return buffer;
    };

    // [35,98,9,54,8,22,67,52,97,20]
    //            35 
    //        9           98
    //    8      22     54
    //         20     52 67
    //                     97

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };
    function randFill( array, min, max ){
        min = min || 0;
        max = max || array.length;
        for( var i=0,l=array.length; i<l; array[i++] = randRange(min,max) );
    };
    
    var unitTest = {
        testAVLInsert:function( array ){
            var root = new Node(array[0]);
            for( var i=1,t,l=array.length; i<l; i++ ){
                t = insert( root, array[i] );
                if( t ) root = t;
            }
            return root;
        },
        randFill:randFill
    }
    return {
        Node:Node,
        insert:insert,
        randRange:randRange,
        minSort:minSort,
        maxSort:maxSort,
        unitTest:unitTest
    };
}();
