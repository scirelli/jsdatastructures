var BinarySearchTree = function(){
    function Node( value ){
        this.parent = null;
        this.left   = null;
        this.right  = null;
        this.value  = value;
        this.toString = function(){
            return this.value;
        }
    };

    function insert( node, value ){
        if( value <= node.value ){
            if( !node.left ){
                node.left = new Node(value);
            }else{
                insert( node.left, value );
            }
        }else if( value >= node.value ){
            if( !node.right ){
                node.right = new Node(value);
            }else{
                insert(node.right, value);
            }
        }
    };
    
    function preOrderTraversal( node, buffer ){
        buffer.push( node.value );
        if( node.left !== null ){
            preOrderTraversal( node.left, buffer );
        }
        if( node.right !== null ){
            preOrderTraversal( node.right, buffer );
        }
    };

    function preOrderTraversalInterative( node, buffer ){
        if( !node ) return;
        var stack = [node];
        
        while( stack.length ){
            node = stack.pop();

            buffer.push(node.value);

            if( node.right ){
                stack.push(node.right);
            }
            if( node.left ){
                stack.push(node.left);   
            }
        }
    };

    //Breath first starting left
    // [35,98,9,54,8,22,67,52,97,20]
    //            35 
    //        9           98
    //    8      22     54
    //         20     52 67
    //                     97
    // This is also called inOrder Traversal
    function minSort( node, buffer ){
        if( node.left !== null ){
            minSort( node.left, buffer );
        }
        buffer.push( node.value );
        if( node.right !== null ){
            minSort( node.right, buffer)
        }
    };
    function maxSort( node, buffer ){
        if( node.right !== null ){
            maxSort( node.right, buffer)
        }
        buffer.push( node.value );
        if( node.left !== null ){
            maxSort( node.left, buffer );
        }
    };
    
    function postOrderTraversal( node, buffer ){
        if( node.left !== null ){
            postOrderTraversal( node.left, buffer );
        }
        if( node.right !== null ){
            postOrderTraversal( node.right, buffer );
        }
        buffer.push( node.value );
    };

    function postOrderTraversalInterative( node, buffer ){
        if( !node ) return;
        var stack = [node];
        
        while( stack.length ){
            node = stack.pop();

            if( node.right ){
                stack.push(node.right);
            }
            if( node.left ){
                stack.push(node.left);   
            }
            buffer.push(node.value);
        }
    };

    function greatestCommonAncestor( node, value1, value2 ){
        if( node.value > value1 && node.value > value2 ){
            return greatestCommonAncestor(node.left, value1, value2 );
        }
        if( node.value < value1 && node.value < value2 ){
            return greatestCommonAncestor(node.right, value1, value2 );
        }
        return node;
    }

    function greatestCommonAncestorIterative( node, value1, value2 ){
        while( node ){
            if( node.value > value1 && node.value > value2 ){
                node = node.left;
            }else if( node.value < value1 && node.value < value2 ){
                node = node.right;
            }else{
                return node;
            }
        }
        return node.value;
    }

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };
    
    var unitTest = {
        testInsert:function( array ){
            if( array === undefined ){
                var root = new Node(randRange(0,100));
                for( var i=0,node=null; i<100; i++ ){
                    insert( root, randRange(0,100) );
                }
                return root;
            }else{
                var root = new Node( array[0] );
                for( var i=1; i<array.length; i++ ){
                    insert( root, array[i] );
                }
                return root;
            }
        },
        testMinSort:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            minSort(root,buffer);
            return buffer;
        },
        testMaxSort:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            maxSort(root,buffer);
            return buffer;
        },
        testPreOrderTraversal:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            preOrderTraversal(root,buffer);
            return buffer;
        },
        testPreOrderTraversalIterative:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            preOrderTraversalInterative(root,buffer);
            return buffer;
        },
        testPostOrderTraversal:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            postOrderTraversal(root,buffer);
            return buffer;
        },
        testPostOrderTraversalIterative:function( array ){
            var root = unitTest.testInsert( array || [35,98,9,54,8,22,67,52,97,20] ),
                buffer = [];
            postOrderTraversalInterative(root,buffer);
            return buffer;
        },
        testGreatestCommonAncestor:function( ){
            var root = unitTest.testInsert( [20,8,4,12,10,14,22] );
            return greatestCommonAncestor(root, 4, 14);
        },
        testGreatestCommonAncestorIterative:function( ){
            var root = unitTest.testInsert( [20,8,4,12,10,14,22] );
            return greatestCommonAncestorIterative(root, 4, 14);
        }
    }
    return {
        Node:Node,
        insert:insert,
        minSort:minSort,
        maxSort:maxSort,
        randRange:randRange,
        unitTest:unitTest
    };
}();
