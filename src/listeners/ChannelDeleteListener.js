module.exports = class channelDeleteListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'channelDelete'
  }

  /**
     *
     * @param {Channel} channel
     * @returns {Promise<void>}
     */
  async execute (channel) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.channel.id === channel.id) {
        collector.stop('Channel Delete')
      }
    })

    this.client.messageCollectors.forEach(collector => {
      if (collector.channel.id === channel.id) {
        collector.stop('Channel Delete')
      }
    })
  }
}
