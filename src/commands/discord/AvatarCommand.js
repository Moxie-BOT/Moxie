const CommandHandler = require('../../structures/command/CommandHandler')
const EmbedBuilder = require('../../utils/EmbedBuilder')

module.exports = class AvatarCommand extends CommandHandler {
  constructor (client) {
    super(client, {
      labels: ['avatar', 'user-icon'],
      requirements: {},
      category: 'Discord',
      parameters: [
        {
          type: 'user',
          acceptAuthor: true
        }
      ],
      description: 'avatar:description',
      usage: 'avatar:usage',
      example: 'avatar:example'
    })
  }

  /**
     *
     * @param {CommandContext} ctx
     * @param {User} user
     */
  async execute (ctx, [user]) {
    const embed = new EmbedBuilder(ctx)
      .setColor('DEFAULT')
      .setTitle('avatar:avatarFrom', { 1: user.tag })
      .setDescription('avatar:download', { 1: user.dynamicAvatarURL()})
      .setImage(user.dynamicAvatarURL())
    await ctx.reply({ embed })
  }
}
