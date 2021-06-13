const Client = require('../Client')
const Eris = require('eris')

module.exports = class MessageDeleteListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageDelete'
  }

  /**
     *
     * @param {Eris.Message} message
     * @returns {Promise<void>}
     */
  async execute (message) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.id === message.id) {
        collector.stop('Message Delete')
      }
    })
  }
}
