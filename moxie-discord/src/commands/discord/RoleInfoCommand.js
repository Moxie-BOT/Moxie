const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const EmbedBuilder = require("../../utils/EmbedBuilder");
const humanizeDuration = require("humanize-duration");
const PermissionsJSON = require("../../utils/ErisPermissions.json");

module.exports = class RoleInfoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["roleinfo"],
            requirements: {},
            category: "discord",
            parameters: [
                {
                    type: "role",
                    highestRole: true
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     */
    async execute(ctx, [role]) {

        const booleans = {
            null: "Nenhum",
            true: "Sim",
            false: "Não"
        },
            timeConfig = {
                largest: 3, units: ['y', 'mo', 'd', 'h', 'm', 's'], language: "pt", round: true, conjunction: " e ", serialComma: false
            }
        let permsRole = role.permissions.json;
        let realPerms = [];

        for (const v in permsRole) realPerms.push(v);
        const embed = new EmbedBuilder()
        embed.setTitle(`Informações de ${role.name}`)
        embed.setColor("DEFAULT")
        embed.addField("💻 ID do cargo", role.id, true)
        embed.addField("👀 Cargo de", role.guild.name, true)
        embed.addField("🎨 Cor", role.color == 0 ? role.color = "#000000" : "#" + ((role.color) >>> 0).toString(16).toUpperCase(), true)
        embed.addField("❓ Mencionável", booleans[role.mentionable], true)
        embed.addField("Menção", `\`${role.mention}\``, true)
        embed.addField("❓ Exibir separadamente", booleans[role.hoist], true)
        embed.addField("🏆 Posição", `#${role.position}`, true)
        embed.addField("👥 Membros", role.guild.members.filter(a => a.roles.includes(role.id)).length, true)
        embed.addField("📆 Criado há", humanizeDuration(Date.now() - role.createdAt, timeConfig), true)
        embed.addField("📛 Permissões", realPerms.length > 0 ? realPerms.map(p => `\`${PermissionsJSON[p]}\``).join(", ") : booleans[null]);

        ctx.reply({ embed });
    }
};