# callbackify
backwards compatibilify your callback functions while migrating apis to promises

## usage
```js
var callbackify = require('callbackify')

var getUserById = callbackify(function (id) {
  // in this example, we're using [minq](https://npm.im/minq)
  return db.users.byId(id).first()
})

// later in your code, we can use a callback

getUserById(23, function (err, user) {
  if (err) { /* give up */ return }
  console.log('hello, ', user.name)
})

// but for newer code, we can consume it as a promise

getUserById(23).then(function (user) {
  console.log('hello, ', user.name)
}, function (err) {
  console.error(err)
})

```
Note, `callbackify` only works on fixed-parameter length functions, not variadic functions. It determines whether or not you're passing in a continuation callback by counting parameters. If you can think of a more clever way, please send a PR!

## api

### `callbackify : (fn: (...args) => Promise<T> ) => (...args, Callback<T>) => Promise<T>`

Takes a Promise-returning function `fn` and returns a new function which can return a Promise or take a callback as the last parameter. If a callback is supplied, the function returns void. If no callback is supplied, the promise is returned.

## installation

    $ npm install callbackify


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) MMXIII jden <jason@denizac.org>. See LICENSE.md
