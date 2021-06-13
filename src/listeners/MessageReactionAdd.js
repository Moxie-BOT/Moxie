module.exports = class MessageReactionAddListener {
  /**
   *
   * @param {Client} client Eris client
   */
  constructor (client) {
    this.client = client
    this.name = 'messageReactionAdd'
  }

  async execute (message, reaction, reactor) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.id === message.id) {
        const user = message.channel.guild.members.get(reactor.id).user
        if (user) collector.collect(reaction, user)
      }
    })
  }
}
