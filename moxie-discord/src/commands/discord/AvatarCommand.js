const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");

module.exports = class AvatarCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["avatar", "user-icon"],
            requirements: {},
            category: "discord",
            parameters: [
                {
                    type: "user",
                    acceptAuthor: true
                },
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [user]) {
        let embed = new EmbedBuilder()
            .setColor("RANDOM")
            .setTitle(`Avatar de ${user.tag}`)
            .setDescription(`**Baixe clicando [aqui](${user.dynamicAvatarURL()})**`)
            .setImage(user.dynamicAvatarURL())
            .setFooter(ctx.author.tag, ctx.author.dynamicAvatarURL());
        ctx.reply({ embed });
    }
};