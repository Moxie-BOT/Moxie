const { existsSync, appendFileSync } = require('fs')

module.exports.checkFiles = async function () {
  if (existsSync('./.env')) return true
  console.log("Hey, I see that this repository doesn't have an env file. Read EnvExample for more information :)")
  appendFileSync('.env', 'DISCORD_TOKEN=Your discord bot token\n' +
      'PREFIX=!\n' +
      'MONGO_URI=URL connection from mongo\n' +
      'BOT_OWNERS=["730425354870587473"]')
  return false
}
