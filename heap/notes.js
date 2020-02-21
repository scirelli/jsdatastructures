/*

                          ( )0
                         /    \
                        /      \
                       /        \
                      /          \
                     /            \
                   ( )1           ( )2
                  /   \           / \
                 /     \         /   \
                /       \       /     \
               ( )3     ( )4   ( )5   ( )6
              /   \
             /     \
           ( )7    ( )8

Length: 9
Mid: 4
*/

/*
Insert: 5
    parentIndex --> (5)0 startIndex; endIndex
-------------------------
Insert: 6
    parentIndex --> (5)0 <-- startIndex
                    /
                  (6)1 <---- endIndex

    startIndex     = 0
    endIndex       = 1
    parentIndex(1) = (1-1)/2 = 0
    6 - 5 = 1
                    (5)0 <-- startIndex
                    /
                  (6)1 <---- endIndex
-------------------------
Insert: 7
     parentIndex -> (5)0 <----- startIndex
                   /   \
                  /     \
                (6)1    (7)2 <- endIndex

    startIndex     = 0
    endIndex       = 2
    parentIndex(2) = (2-1)/2 = 0
    7 - 5 = 2
                    (5)0 <----- startIndex
                   /   \
                  /     \
                (6)1    (7)2 <- endIndex
-------------------------
Insert: 9
                    (5)0 <----- startIndex
                   /   \
                  /     \
 parentIndex -> (6)1    (7)2
                /
               /
             (9)3   <---------- endIndex

    startIndex     = 0
    endIndex       = 3
    parentIndex(3) = (3-1)/2 = 1
    9 - 6 = 3

                    (5)0 <----- startIndex
                   /   \
                  /     \
                (6)1    (7)2
                /
               /
             (9)3   <---------- endIndex
-------------------------
Insert: 4
                    (5)0 <----- startIndex
                   /   \
                  /     \
 parentIndex -> (6)1    (7)2
                /  \
               /    \
             (9)3   (4)4 <---------- endIndex

    startIndex     = 0
    endIndex       = 4
    parentIndex(4) = (4-1)/2 = 1
    4 - 6 = -2

                    (5)0 <----- startIndex
                   /   \
                  /     \
 parentIndex -> (4)1    (7)2
                /  \
               /    \
             (9)3   (6)4 <---------- endIndex


    parentIndex --> (5)0 <----- startIndex
                   /   \
                  /     \
    endIndex -> (4)1    (7)2
                /  \
               /    \
             (9)3   (6)4

    startIndex     = 0
    endIndex       = 1
    parentIndex(1) = (1-1)/2 = 0
    4 - 5 = -1

       endIndex --> (4)0 <----- startIndex
                   /   \
                  /     \
                (5)1    (7)2
                /  \
               /    \
             (9)3   (6)4
*/
/*
                          (4)0
                         /    \
                        /      \
                       /        \
                      /          \
                     /            \
                   (5)1           (7)2
                  /   \
                 /     \
                /       \
               (9)3     (6)4
*/
/*

pop():

Result: 4
                    ( )0
                   /   \
                  /     \
                (5)1    (7)2
                /  \
               /    \
             (9)3   (6)4

---- a[0] = a.pop()
                    (6)0
                   /   \
                  /     \
                (5)1    (7)2
                /
               /
             (9)3
---- sinkDown
rootIndex: 0
endPos: 4
startPos: 0
newItem: 6
leftChild: 1
                    (6)0 <----- rootIndex
                   /   \
                  /     \
  leftChild --> (5)1    (7)2 <- rightChild
                /
               /
             (9)3 <------------ endPos

                    (5)0
                   /   \
                  /     \
   rootIndex -> (5)1    (7)2
                /
               /
             (9)3 <- leftChild
rootIndex: 1
endPos: 4
startPos: 0
newItem: 6
leftChild: 3
rightChild: 4

                    (5)0
                   /   \
                  /     \
                (6)1    (7)2
                /
               /
             (9)3
-------------------------
*/
