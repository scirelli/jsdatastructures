var Trie = (function(){
    var MAX_WORDS_TO_ADD_AT_ONCE = 100;

    function Trie( aWords ){
        this.headNode = new TrieNode();

        if( aWords ){
            this.addWordList(aWords);
        }
    }

    Trie.prototype.addWordList = function( aWords ){
        var defered = Q.defer();
        
        if( !aWords || aWords.length <= 0 ){
            defered.reject("No word list to add.");
        }else{
            addWordList( this, aWords, 0, defered );
        }

        return defered.promise;
    };
    
    Trie.prototype.isWord = function( sWord ){
        if( sWord && sWord.length == 0 ) return false;
        sWord = sWord.trim().toLowerCase();
        if( sWord.length == 0 ) return false;

        var node = this.headNode;
        for( var i=0,l=sWord.length,a='a'.charCodeAt(0),charCode=0,char=''; i<l; i++ ){
            charCode = sWord.charCodeAt(i)-a;
            if( node.childNodes[charCode] ){
                node  = node.childNodes[charCode];
                continue;
            }else{
                break;
            }
        }
        return node.isWord;
    };

    function addWordList( trie, aWords, totalAdded, defered ){
        setTimeout( function(){
            for( var i=0; i<MAX_WORDS_TO_ADD_AT_ONCE && totalAdded < aWords.length; i++ ){
                trie.addWord(aWords[totalAdded]);
                totalAdded++;
                defered.notify( { percent:totalAdded/(aWords.length-1), word:aWords[totalAdded] } );
            }
            if( totalAdded < aWords.length-1 ){
                addWordList(trie, aWords, totalAdded, defered );
            }else{
                defered.resolve( true );
            }
        }, 10);
    };

    Trie.prototype.addWord = function( sWord ){
        if( sWord.length == 0 ) return;
        sWord = sWord.toLowerCase();
        var node = this.headNode;
        for( var i=0,l=sWord.length,charCode=0,a='a'.charCodeAt(0),char='',tNode=null; i<l; i++ ){
            charCode = sWord.charCodeAt(i) - a;
            char = sWord.charAt(i);
            if( node.childNodes[charCode] ){
                node  = node.childNodes[charCode];
                continue;
            }else{
                tNode = new TrieNode(char);
                node.childNodes[charCode] = tNode;
                node = tNode;
            }
        }
        node.isWord = true;
    };

    function TrieNode( char ){
        this.char = char || '';
        this.isWord = false;
        this.childNodes = [];
    };

    return Trie;
})();
