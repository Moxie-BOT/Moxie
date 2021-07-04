const Logger = require('../utils/Logger')
const MongoDB = require('../database/MongoDB')

module.exports = class DatabaseRegistry {
  constructor (client) {
    this.client = client
    this.database = null

    this.load().then(r => {})
  }

  async load () {
    await this.initializeDatabase({
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 35000
    })
    this.database.mongoose.connection.on('disconnected', () => Logger.warning('Database lost connection!'))
    this.database.mongoose.connection.on('reconnected', () => Logger.info('Database connection reestablished'))
    this.database.mongoose.connection.on('reconnectFailed', () => Logger.warning('Fails when trying to reconnect to the database'))
  }

  async initializeDatabase (options = {}) {
    this.database = new MongoDB(options)
    await this.database
      .connect()
      .then(() => Logger.info('Database connections established!'), this.client.database = this.database)
      .catch((err) => {
        Logger.error('Database connection failed ' + err)
        this.database = null
      })
  }
}
