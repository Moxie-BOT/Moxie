module.exports = class GuildCacheManager {
  constructor (client) {
    this.client = client
    this.cached = new Map()
  }

  async add (id) {
    const gRes = await this.client.database.guilds.get(id)
    await this.cached.set(id, { prefix: gRes.settings.prefix || process.env.prefix })
    return this.cached.get(id)
  }

  async remove (id) {
    await this.client.database.guilds.remove(id)
    return this.cached.delete(id)
  }

  get (id) {
    return this.cached.get(id) || this.add(id)
  }

  async update (id, entity) {
    await this.client.database.guilds.update(id, { settings: entity })
    await this.cached.set(id, entity)
    return this.get(id)
  }
}
