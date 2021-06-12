const CommandContext = require("../../structures/command/CommandContext");
const CommandHandler = require("../../structures/command/CommandHandler");
const Eris = require("eris");
const funCheck = require("../../utils/others/CheckMsg");

module.exports = class BanCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            labels: ["ban", "banir", "hackban", "b"],
            requirements: {
                permissions: ["banMembers"],
                botPermissions: ["banMembers"]
            },
            category: "moderation",
            parameters: [
                {
                    type: "user",
                    acceptAuthor: false
                },
                {
                    type: "string",
                    full: true,
                    required: false
                }
            ]
        });
    }
    /**
     *
     * @param {CommandContext} ctx
     * @param {Eris.User} user
     * @param {String} reason
     */
    async execute(ctx, [user, reason]) {
        if (user.id === this.client.user.id) {
            await funCheck.CheckMsg(ctx, null, {
                me: true
            })
            return;
        }
        const action = async (ds) => await ds.guild.banMember(user.id, 7, reason)
        await funCheck.CheckMsg(ctx, action, {
            punishmentTxt: true,
            stringQuestion: `⚠ Você quer mesmo banir ${user.mention} (\`${user.tag}\`/\`${user.id}\`)? Para confirmar o banimento, clique em ✅`
        })
    }
};