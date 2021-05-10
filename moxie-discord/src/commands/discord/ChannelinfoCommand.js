const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");
const humanizeDuration = require("humanize-duration");

module.exports = class ChannelinfoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["channelinfo", "categoryinfo", "voiceinfo"],
            requirements: {},
            category: "discord",
            parameters: [
                {
                    type: "channel",
                    acceptLocal: true
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [channel]) {
        const embed = new EmbedBuilder(),
            channelType = {
                0: "Canal de texto",
                2: "Canal de voz",
                4: "Categoria",
                5: "Canal de anúncios",
                6: "Canal de vendas",
                13: "Canal stage"
            },
            booleans = {
                null: "Nenhum",
                true: "Sim",
                false: "Não"
            },
            timeConfig = {
                largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: "pt", round: true, conjunction: " e ", serialComma: false
            };

        embed.setTitle(`Informações de ${channel.name}`)
        embed.setDescription(channel.topic ? `${channel.topic.substr(0, 1024)}` : null)
        embed.addField("💻 ID do canal", channel.id, true)
        embed.addField("💈 Tipo", channelType[channel.type], true)
        embed.addField("👀 Canal de", channel.guild.name, true)
        embed.setColor("RANDOM");

        switch (channel.type) {
            case 0:
            case 5:
            case 6:
                embed.addField("🔞 NSFW", booleans[channel.nsfw], true)
                embed.addField("🐌 Modo lento", channel.rateLimitPerUser > 0 ? `${channel.rateLimitPerUser} segundos` : booleans[null], true);
                break;
            case 2:
                embed.addField("🎙️ Taxa de bits", channel.bitrate ? channel.bitrate : booleans[null], true)
                embed.addField("👥 Limite de membros", channel.userLimit ? channel.userLimit : booleans[null], true)
                embed.addField("📷 Qualidade de vídeo", channel.videoQualityMode == 1 ? "auto" : "720p", true)
                embed.addField("🗣️ Membros no canal", channel.voiceMembers ? channel.voiceMembers.map(lk => lk.user.mention).slice(0, 10).join(", ") : booleans[null]);
                break;
        };
        embed.addField("📆 Criado há", humanizeDuration(Date.now() - channel.createdAt, timeConfig), true);
        ctx.reply({ embed })
    }
};