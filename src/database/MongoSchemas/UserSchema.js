const MongoRepository = require('../MongoRepository')

module.exports = class UserRepository extends MongoRepository {
  constructor (mongoose) {
    super(mongoose, mongoose.model('Users', new mongoose.Schema({
      _id: {
        type: String,
        default: null
      },
      settings: {
        autocheck: {
          type: Boolean,
          default: false
        }
      }
    }, { versionKey: false })
    ))
  }
}
