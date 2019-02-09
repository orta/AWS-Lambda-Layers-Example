const _ = require("underscore")

module.exports = {
  hello: () => "Hello " + _.random(1, 10)
}
