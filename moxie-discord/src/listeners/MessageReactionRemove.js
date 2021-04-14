const Client = require("../Client");

module.exports = class MessageReactionRemoveListener {
  /**
   * 
   * @param {Client} client Eris client
   */
  constructor(client) {
    this.client = client;
    this.name = "messageReactionRemove";
  }

  async execute(message, reaction, userID) {
    this.client.reactionCollectors.forEach(collector => {
      if (collector.message.id === message.id) {
        const user = this.client.users.get(userID);
        if (user)
          collector.remove(reaction, user);
      }
    });
  }
};