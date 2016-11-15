
// 添加了对promise对象的判断

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];
        promise._status = 'PENDING';

    this.then = function (onFulfilled) {
        return new Promise(function(resolve) {
            function handle(value) {
                var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
                if( ret && typeof ret ['then'] == 'function'){
                    ret.then(function(value){
                       resolve(value);
                    });
                } else {
                    resolve(ret);
                }
            }
            if (promise._status === 'PENDING') {
                promise._resolves.push(handle);
            } else if(promise._status === FULFILLED){
                handle(value);
            }
        })
        
    };


    function resolve(value) {
        setTimeout(function(){
            promise._status = "FULFILLED";
            promise._resolves.forEach(function (callback) {
                value = callback.call(promise, value);
            })
        },0);
    }

    fn(resolve);
}