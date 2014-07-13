function callbackify(fn) {
  var fnLength = fn.length
  return function () {
    var args = [].slice.call(arguments)
    var ctx = this
    if (args.length === fnLength + 1 &&
        typeof args[fnLength] === 'function') {
      // callback mode
      var cb = args.pop()
      fn.apply(this, args)
        .then(function (val) { cb.call(ctx, null, val) },
          function (err) { cb.call(ctx, err) })
        return
    }
    // promise mode
    return fn.apply(ctx, arguments)
  }
}

module.exports = callbackify
