
// 加入了状态

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];
        promise._status = 'PENDING';

    this.then = function (onFulfilled) {
        if (promise._status === 'PENDING') {
            promise._resolves.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };


    function resolve(value) {
        setTimeout(function(){
            promise._status = "FULFILLED";
            promise._resolves.forEach(function (callback) {
                callback(value);
            })
        },0);
    }

    fn(resolve);
}