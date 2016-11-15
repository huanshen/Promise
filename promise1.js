
// 初步构建

function Promise(fn){
  //需要一个成功时的回调
  var callback;
  //一个实例的方法，用来注册异步事件
  this.then = function(done){
    callback = done;
  }
  function resolve(){
    callback();
  }
  fn(resolve);
}