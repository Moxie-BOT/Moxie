module.exports = class Logger {
  /**
   *
   * @param {String} logType
   * @param {String} message
   */
  static generateLog (logType, message) {
    console.log(
            `${new Date().getHours() + ':' + new Date().getMinutes() + '.' + new Date().getMilliseconds()} ${logType} ${message}`
    )
  }

  /**
   *
   * @param {String} message
   */
  static debug (message) {
    if (process.env.DEBUG !== 'true') return
    this.generateLog('[DEBUG]', message)
  }

  /**
   *
   * @param {String} message
   */
  static info (message) {
    this.generateLog('[INFO]', message)
  }

  /**
   *
   * @param {String} message
   */
  static warning (message) {
    this.generateLog('[WARNING]', message)
  }

  /**
   *
   * @param {String} message
   */
  static error (message) {
    this.generateLog('[ERROR]', message)
  }

  /**
   *
   * @param {String} message
   */
  static shardMessage (message) {
    this.generateLog('[SHARD MANAGER]', message)
  }

  /**
   *
   * @param {String} message
   */
  static fatalError (message) {
    this.generateLog('[FATAL ERROR]', message)
    process.exit()
  }
}
