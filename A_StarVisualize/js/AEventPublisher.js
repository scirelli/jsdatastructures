((window)=>{
    class AEventPublisher{
        constructor() {
            this.handlers = {};
        }

        on(eventName, handler) {
            if(!this.handlers[eventName]) {
                this.handlers[eventName] = [];
            }
            this.handlers[eventName].push(handler);
            let removeAt = this.handlers[eventName].length - 1;
            return function off() {
                return this.handlers[eventName].splice(removeAt, 1);
            };
        }

        fire(eventName) {
            let args = Array.prototype.slice.call(arguments, 1);
            for(let handler of this.handlers[eventName] || []) {
                handler.defer(handler, ...args);
            }
            return this;
        }
    }

    window.AEventPublisher = AEventPublisher;
})(window);
