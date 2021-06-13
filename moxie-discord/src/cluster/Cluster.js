const Client = require('../Client')
init()

function init () {
  if (process.env.CANARY === 'true') {
    process.env.DISCORD_TOKEN = process.env.CANARY_DISCORD_TOKEN
    process.env.MONGO_URI = process.env.CANARY_MONGO_URI
    process.env.PREFIX = process.env.CANARY_PREFIX
  }
  const client = new Client(process.env.DISCORD_TOKEN, {
    defaultImageFormat: 'png',
    restMode: true,
    maxShards: parseInt(process.env.TOTAL_SHARDS),
    defaultImageSize: 2048,
    getAllUsers: true,
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      replied_user: true
    },
    intents: [
      'guilds',
      'guildMembers',
      'guildMessages',
      'guildMessageReactions',
      'guildInvites'
    ],
    disableEvents: {
      CHANNEL_CREATE: true,
      CHANNEL_UPDATE: true,
      GUILD_BAN_ADD: true,
      GUILD_BAN_REMOVE: true,
      GUILD_MEMBER_ADD: true,
      GUILD_MEMBER_REMOVE: true,
      GUILD_MEMBER_UPDATE: true,
      GUILD_ROLE_CREATE: true,
      GUILD_ROLE_DELETE: true,
      GUILD_ROLE_UPDATE: true,
      GUILD_UPDATE: true,
      PRESENCE_UPDATE: true,
      TYPING_START: true,
      USER_UPDATE: true,
      VOICE_STATE_UPDATE: true
    }
  })
  client.connect()
}
