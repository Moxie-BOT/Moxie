const Logger = require('../utils/Logger')
const MongoDB = require('../database/MongoDB')

module.exports = class DatabaseRegistry {
  constructor (client) {
    this.client = client
    this.database = null

    this.load().then(r => {})
  }

  async load () {
    if (process.env.PRODUCTION !== 'true') return Logger.warning('Database has not been initialized, as PRODUCTION mode is disabled')
    await this.initializeDatabase({
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
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
