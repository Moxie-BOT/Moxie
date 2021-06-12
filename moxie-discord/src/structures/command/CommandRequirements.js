const CommandContext = require("./CommandContext");
const PermissionsJSON = require("../../utils/others/ErisPermissions.json");

function parseOptions(options) {
    return {
        permissions: options.permissions,
        botPermissions: options.botPermissions,

        onlyDevs: !!options.onlyDevs,
    };
}

/**
 *
 * @param {CommandContext} ctx
 * @param {Object} opt
 */
async function handle(ctx, opt) {
    let options = parseOptions(opt);
    let developers = JSON.parse(process.env.BOT_OWNERS);

    if (options.onlyDevs && !developers.includes(ctx.author.id))
        throw new Error(
            "Você não pode usar esse comando"
        );

    if (options.permissions && options.permissions.length > 0) {
        const json = ctx.member.permissions.json;
        const perms = Object.keys(json).filter(field => json[field]);
        let includes = false
        for (const item in perms) {
            if (options.permissions.includes(perms[item])) {
                includes = true
                break
            }
        }
        if (!includes) throw new Error(`Você não tem permissão de ${options.permissions.map(p => PermissionsJSON[p]).join(", ")}`)
    }

    if (options.botPermissions && options.botPermissions.length > 0) {
        const json = ctx.guild.members.get(ctx.client.user.id).permissions.json;
        const perms = Object.keys(json).filter(field => json[field]);
        let includes = false
        for (const item in perms) {
            if (options.botPermissions.includes(perms[item])) {
                includes = true
                break
            }
        }
        if (!includes) throw new Error(`Eu não tenho permissão de ${options.permissions.map(p => PermissionsJSON[p]).join(", ")}`)
    }
}

module.exports.handle = handle;