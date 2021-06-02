const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");
const humanizeDuration = require("humanize-duration");
const { Constants, User } = require("eris");

module.exports = class UserinfoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["userinfo"],
            requirements: {},
            category: "discord",
            parameters: [
                {
                    type: "user",
                    acceptAuthor: true
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     * @param {User} user
     */
    async execute(ctx, [user]) {
        const timeConfig = {
            largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: "pt", round: true, conjunction: " e ", serialComma: false
        }

        /*const emojis = {
            VERIFIED_BOT_DEVELOPER: '<:Developer:782710118985760828>',
            HYPESQUAD_EVENTS: '<:HypeEvent:782710122206986300>',
            DISCORD_EMPLOYEE: '<:Funcionario:782710118085165116>',
            BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:782710117266096160>',
            BUGHUNTER_LEVEL_1: '<:BugHunterLvl1:782710118848266282>',
            HOUSE_BRILLIANCE: '<:Briliance:782710121532096512>',
            PARTNERED_SERVER_OWNER: '<:Partner:782710117308694529>',
            HOUSE_BRAVERY: '<:Bravery:782710118088835094>',
            HOUSE_BALANCE: '<:Balance:782710120211677194>',
            EARLY_SUPPORTER: '<:ApoiadorInicial:782710118759923714>',
            VERIFIED_BOT: '<:BotVerificado:789853284680073226>',
            TEAM_USER: '',
            SYSTEM: '',
        }*/

        const flags = user.publicFlags;
        const embed = new EmbedBuilder();
        /*let title
        if (flags) {
            const filterFlags = Object.entries(Constants.UserFlags).filter(([, bit]) => (flags & bit) === bit).map(([field,]) => field).map(f => emojis[f]);
            title = `Informações de ${user.tag} ${filterFlags.join(" ")}`
            if (title.length > 256) {
                title = user.tag
                embed.addField("🚩 Emblemas", badges.join(' '), true)
            }
        } else title = `Informações de ${user.tag}`*/

        embed.setTitle(`Informações de ${user.tag}`)
        embed.setThumbnail(user.dynamicAvatarURL())
        embed.setColor("DEFAULT")
        embed.addField("📚 Tag", `\`${user.tag}\``, true)
        embed.addField("💻 ID do usuário", `\`${user.id}\``, true)
        embed.addField("📆 Criado há", humanizeDuration(Date.now() - user.createdAt, timeConfig), true)
        embed.setFooter(ctx.author.tag, ctx.author.dynamicAvatarURL());

        if (ctx.guild.members.has(user.id)) embed.addField("📆 Entrou há", humanizeDuration(Date.now() - ctx.guild.members.get(user.id).joinedAt, timeConfig), true);
        await ctx.reply({embed})
    }
};