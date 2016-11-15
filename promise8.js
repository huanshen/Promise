
// 添加promise.race

function Promise(fn) {
    var promise = this;
        promise._value;
        promise._reason;
        promise._resolves = [];
        promise._rejects = [];
        promise._status = 'PENDING';

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function(resolve, reject) {
            function handle(value) {
                var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
                if(ret && typeof ret ['then'] == 'function'){
                    ret.then(function(value){
                       resolve(value);
                    },function(reason){
                       reject(reason);
                    });
                } else {
                    resolve(ret);
                }
            }
            function errback(reason){
                reason = typeof onRejected === 'function' && onRejected(reason) || reason;
                reject(reason);
            }
            if (promise._status === 'PENDING') {
                promise._resolves.push(handle);
                promise._rejects.push(errback);
            } else if(promise._status === 'FULFILLED'){
                handle(promise._value);
            } else if(promise._status === 'REJECTED') {
            errback(promise._reason);
        }
        })
        
    };


    function resolve(value) {
        setTimeout(function(){
            promise._status = "FULFILLED";
            promise._resolves.forEach(function (callback) {
                promise._value = callback( value);
            })
        },0);
    }

    function reject(value) {
        setTimeout(function(){
            promise._status = "REJECTED";
            promise._rejects.forEach(function (callback) {
                promise._reason = callback(value);
            })
        },0);
    }

    fn(resolve, reject);
}

Promise.all = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
    }
    return new Promise(function(resolve,reject){
        var i = 0,
            result = [],
            len = promises.length,
            count = len

        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }

        function rejecter(reason){
            reject(reason);
        }

        function resolveAll(index,value){
            result[index] = value;
            if( --count == 0){
                resolve(result)
            }
        }

        for (; i < len; i++) {
            promises[i].then(resolver(i),rejecter);
        }
    });
}

Promise.race = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return new Promise(function(resolve,reject){
        var i = 0,
            len = promises.length;

        function resolver(value) {
            resolve(value);
        }

        function rejecter(reason){
            reject(reason);
        }

        for (; i < len; i++) {
            promises[i].then(resolver,rejecter);
        }
    });
}
