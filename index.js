var through = require('through2')

module.exports = wrap

function wrap(pre, post) {
  var first = true
  var send_pre = pre !== null && arguments.length
  var send_post = post !== null && arguments.length > 1

  return through(write, end)

  function write(data, enc, cb) {
    if (first) {
      if (send_pre) this.push(pre)
      first = false
    }

    this.push(data)
    cb()
  }

  function end() {
    if (send_post) this.push(post)
    this.push(null)
  }
}
