//Only sorts integers
var  CountSort = function(){
    function sort( aItems ){
        var tmpArray = [];
        
        for( var i=0,l=aItems.length; i<l; i++ ){
            tmpArray[ aItems[i] ] = tmpArray[aItems[i]] ? tmpArray[aItems[i]]+1 : 1;
        }
        aItems = [];
        for( var i=0,l=tmpArray.length,itm=0; i<l; i++ ){
            itm = tmpArray[i];
            for( j=0; j<itm; j++ ){
                aItems.push( i );
            }
        }
        return aItems; 
    };

    function sortWithOrder( aItems, pos ){
        var tmpArray = [];
        14567 
        for( var i=0,l=aItems.length,itm=0,radix=0; i<l; i++ ){
            itm = aItems[i]; 
            radix = ~~((itm%(Math.pow(10,pos)))/Math.pow(10,pos-1));
            //TODO:
            tmpArray[aItems[i]] && tmpArray[aItems[i]].push ? tmpArray[aItems[i]].push(aItems[i]) : tmpArray[aItems[i]] = [aItems[i]];
        }
        aItems = [];
        for( var i=0,l=tmpArray.length,itm=0; i<l; i++ ){
            itm = tmpArray[i];
            if( itm ){
                for( j=0,l2=itm.length; j<l2; j++ ){
                    aItems.push( itm[j] );
                }
            }
        }
        return aItems; 
    };

    function randRange( min, max ){
        return ~~(Math.random()*max + min);
    };

    function randFill( array, min, max ){
        min = min || 0;
        max = max || array.length;
        for( var i=0,l=array.length; i<l; array[i++] = randRange(min,max) );
        return array;
    };
    
    var unitTest = {
        randFill:randFill,
        testArray:[15, 15, 7, 42, 1, 20, 40, 4, 38, 45],
        testCountSort:function(){
            return sort(unitTest.testArray);
        },
        testSortWithOrder:function(){
            return sortWithOrder(unitTest.testArray);
        }
    }
    return {
        randRange:randRange,
        sort:sort,
        unitTest:unitTest
    };
}();
