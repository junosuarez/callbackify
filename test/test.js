var chai = require('chai')
chai.should()
var Q = require('q')

describe('callbackify', function () {
  var callbackify = require('../')

  it('turns a promise-returning function into a CPS fn', function (done) {

    var foo = callbackify(function () {
      return Q('hello!')
    })

    foo(function (err, res) {
      try {
        res.should.equal('hello!')
        chai.expect(err).to.equal(null)
      } catch (e) { done(e) }
      done()
    })

  })

  it('catches errors', function (done) {
    var foo = callbackify(function () {
      return Q.reject(new Error('yar!'))
    })

    foo(function (err, res) {
      try {
        chai.expect(res).to.equal(undefined)
        err.should.be.instanceof(Error)
        err.message.should.equal('yar!')
      } catch (e) { done(e) }
      done()
    })

  })

  it('with parameters', function (done) {

    var foo = callbackify(function (x, y) {
      return Q(x+y)
    })

    foo(23, 12, function (err, res) {
      try {
        chai.expect(err).to.equal(null)
        res.should.equal(35)
      } catch (e) { done(e) }
      done()
    })

  })

  it('returns the promise if no cb is specified', function (done) {

    var foo = callbackify(function () {
      return Q(108)
    })

    foo().then(function (val) {
      val.should.equal(108)
    })
    .then(done, done)
  })

})