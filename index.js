function callbackify(fn) {
  var fnLength = fn.length
  return function () {
    var args = [].slice.call(arguments)
    if (args.length === fnLength + 1 &&
        typeof args[fnLength] === 'function') {
      // callback mode
      var cb = args.pop()
      fn.apply(this, args)
        .then(function (val) { cb(null, val) },
          function (err) { cb(err) })
        return
    }
    // promise mode
    return fn.apply(this, arguments)
  }
}

module.exports = callbackify
