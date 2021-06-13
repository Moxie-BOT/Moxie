const Events = require('events')
const Client = require('../Client')
const Eris = require('eris')

class ReactionCollector extends Events {
  /**
     *
     * @param {Client} client
     * @param {Eris.Message} message
     * @param filter
     * @param {Object} options
     */
  constructor (client, message, filter, options = {}) {
    super()
    this.client = client
    this.message = message
    this.filter = filter
    this.options = options
    this.reactionCount = 0

    if (this.options.time) {
      this.timeout = setTimeout(() => {
        this.stop('Time')
        delete this.timeout
      }, this.options.time)
    }
    this.client.reactionCollectors.push(this)
  }

  collect (reaction, user) {
    if (this.filter(reaction, user)) {
      this.reactionCount++
      this.emit('collect', reaction, user)

      if (this.options.max && this.reactionCount === this.options.max) this.stop('Max')
    }
  }

  remove (reaction, user) {
    if (this.filter(reaction, user)) {
      this.reactionCount++
      this.emit('remove', reaction, user)

      if (this.options.max && this.reactionCount === this.options.max) this.stop('Max')
    }
  }

  stop (reason = 'Manual') {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.emit('end', reason)
    this.client.reactionCollectors.splice(this.client.reactionCollectors.indexOf(this), 1)
  }
}

class MessageCollector extends Events {
  constructor (client, channel, filter, options = {}) {
    super()
    this.client = client
    this.channel = channel
    this.filter = filter
    this.options = options
    this.messageCount = 0

    if (this.options.time) {
      this.timeout = setTimeout(() => {
        this.stop('Time')
        delete this.timeout
      }, this.options.time)
    }

    this.client.messageCollectors.push(this)
  }

  collect (message) {
    if (this.filter(message)) {
      this.messageCount++
      this.emit('collect', message)

      if (this.options.max && this.messageCount === this.options.max) this.stop('Max')
    }
  }

  stop (reason = 'Manual') {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.emit('end', reason)
    this.client.messageCollectors.splice(this.client.messageCollectors.indexOf(this), 1)
  }
}
module.exports = {
  ReactionCollector: ReactionCollector,
  MessageCollector: MessageCollector
}
