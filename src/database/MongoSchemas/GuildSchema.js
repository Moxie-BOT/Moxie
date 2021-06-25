const MongoRepository = require('../MongoRepository')

module.exports = class GuildRepository extends MongoRepository {
  constructor (mongoose) {
    super(mongoose, mongoose.model('Guilds', new mongoose.Schema({
      _id: {
        type: String,
        default: null
      },
      settings: {
        prefix: {
          type: String,
          default: process.env.PREFIX
        },
        eventLog: {
          channelID: {
            type: String,
            default: null
          },
          activeListeners: {
            type: Array,
            default: []
          }
        },
        language: {
          type: Number,
          default: 0
        }
      }
    })
    ))
  }
}
