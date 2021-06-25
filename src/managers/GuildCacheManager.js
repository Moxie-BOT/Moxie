module.exports = class GuildCacheManager {
  constructor (client) {
    this.client = client
  }

  async add (id) {
    const guild = this.client.guilds.get(id)
    const gRes = await this.client.database.guilds.get(id)
    // eslint-disable-next-line no-return-assign
    return guild.storage = {
      prefix: gRes.settings.prefix || process.env.prefix,
      logEventID: gRes.settings.eventLog.channelID || null,
      activedLogs: gRes.settings.eventLog.activeListeners || null,
      language: gRes.settings.language || 0
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
    const guild = this.client.guilds.get(id)
    if (!guild) await this.add(id)
    await this.client.database.guilds.update(id, { settings: entity })
    // eslint-disable-next-line no-return-assign
    return guild.storage = {
      prefix: entity.prefix || guild.prefix,
      activedLogs: entity.activedLogs || guild.activedLogs,
      logEventID: entity.logEventID || guild.logEventID,
      language: entity.language || guild.language
    }
  }
}
