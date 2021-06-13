module.exports = class messageDeleteBulkListener {
  /**
     *
     * @param {Client} client Eris client
     */
  constructor (client) {
    this.client = client
    this.name = 'messageDeleteBulk'
  }

  async execute (message) {
    const msgIDs = message.map(m => m.id)
    const collectors = []

    this.client.reactionCollectors.forEach(collector => {
      if (msgIDs.includes(collector.message.id)) {
        collectors.push(collector)
      }
    })
    collectors.forEach(c => c.stop('Message Delete'))
  }
}
