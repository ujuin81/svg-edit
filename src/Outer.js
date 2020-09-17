var out = (function () {
  function fn() {}

  function inner() {
    fn();
  }
  inner.prototype.fn2 = function () {
    console.log("fn2");
  };

  return inner;
})();

var o = new out();
o.fn2();
console.dir(o, typeof o);

export default out;
