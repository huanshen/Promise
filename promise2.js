
//链式支持

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];

    this.then = function (onFulfilled) {
        promise._resolves.push(onFulfilled);
        return this;
    };

    function resolve(value) {
        setTimeout(function() {
            promise._resolves.forEach(function (callback) {
                callback(value);
            });
        },0);
    }

    fn(resolve);
}