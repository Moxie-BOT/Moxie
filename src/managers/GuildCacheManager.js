module.exports = class GuildCacheManager {
  constructor (client) {
    this.client = client
  }

  async add (id) {
    const guild = this.client.guilds.get(id)
    const gRes = await this.client.database.guilds.get(id)
    return guild.storage = {
      prefix: gRes.settings.prefix || process.env.prefix,
      logEventID: gRes.settings.eventLog.channelID || null,
      activedLogs: gRes.settings.eventLog.activeListeners || [],
      language: gRes.settings.language || 0,
      commandsChannels: gRes.settings.commandsChannels || []
    }
  }

  async remove (id) {
    const guild = this.client.guilds.get(id)
    await this.client.database.guilds.remove(id)
    delete guild.storage
    return true
  }

  get (id) {
    return this.client.guilds.get(id).storage || this.add(id)
  }

  async update (id, entity = {}) {
    let guild = this.client.guilds.get(id)
    if (!guild) guild = await this.add(id)
    return guild.storage = {
      prefix: entity.prefix || guild.storage.prefix,
      activedLogs: entity.activedLogs || guild.storage.activedLogs,
      logEventID: entity.logEventID || guild.storage.logEventID,
      language: entity.language || guild.storage.language,
      commandsChannels: entity.commandsChannels || guild.storage.commandsChannels
    }
  }
}
