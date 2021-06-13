const models = Object.keys(require('./MongoSchemas'))
const mongoose = require('mongoose')

module.exports = class MongoDB {
  constructor (options = {}) {
    this.options = options
    this.mongoose = mongoose
  }

  async connect () {
    return mongoose.connect(process.env.MONGO_URI, this.options).then((m) => {
      for (let i = 0; i < models.length; i++) { this[models[i]] = new (Object.values(require('./MongoSchemas'))[i])(m) }
    })
  }
}
