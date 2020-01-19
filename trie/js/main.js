(function(){
    $(document).ready(function(){
        var elmPercentComplete = document.getElementById('percentComplete'),
            elmSubmit          = document.getElementById('submit'),
            elmInput           = document.getElementById('word'),
            elmOutput          = document.getElementById('output');
        var trie = new Trie();

        $.ajax({
            url:'./words.txt',
            dataType:'json',
            method:'GET'
        }).then(
            function(data){
                trie.addWordList(data.aWords).then(
                    function done( complete ){
                        elmSubmit.disabled = false;
                        setTimeout(function(){
                            elmPercentComplete.innerText += " Complete!";
                        },1000);
                    },
                    function error( e ){
                        debugger;
                    },
                    function notify( oProgress ){
                        elmPercentComplete.innerText = ~~(oProgress.percent*100) + '%';
                    }
                ).done();
            },
            function ajaxError(a,b,c){
                debugger;
            }
        ).done();

        elmSubmit.addEventListener('click', function(e){
            var word = elmInput.value;
            elmInput.value = '';
            elmOutput.value = "";
            if( trie.isWord(word) ){
                elmOutput.value = "Yes! " + word;
            }else{
                elmOutput.value = word + " nope!";
            }
        });
    });
})();
