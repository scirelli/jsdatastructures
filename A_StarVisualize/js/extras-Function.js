if( !Function.defer ) {
    Function.prototype.defer = function( scope ) {
        var args = Array.prototype.slice.call( arguments, 1 ),
            func = this;
        scope = scope || window;
        return window.setTimeout( function() {
            func.apply( scope, args );
        }, 0 );
    };
}
