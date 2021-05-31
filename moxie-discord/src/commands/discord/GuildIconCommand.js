const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");

module.exports = class GuildIconCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["guildicon", "servericon"],
            requirements: {},
            category: "discord",
            parameters: [
                {
                    type: "guild",
                    acceptLocal: true
                },
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [guild]) {
        if (!guild.dynamicIconURL()) return ctx.reply("<:error:821900333289570304> Este servidor não possui um icon para ser mostrado")

        let embed = new EmbedBuilder()
            .setColor("DEFAULT")
            .setTitle(`Icon de ${guild.name}`)
            .setDescription(`**Baixe clicando [aqui](${guild.dynamicIconURL()})**`)
            .setImage(guild.dynamicIconURL())
            .setFooter(ctx.author.tag, ctx.author.dynamicAvatarURL());
        ctx.reply({ embed });
    }
};