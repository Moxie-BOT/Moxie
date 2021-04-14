const CommandContext = require("./CommandContext");

function parseOptions(options) {
    return {
        permissions: options.permissions,
        botPermissions: options.botPermissions,

        onlyDevs: !!options.onlyDevs,
        blockChannel: !!options.blockChannel || true,
        blockCmd: !!options.blockCmd || true,
    };
}

/**
 *
 * @param {CommandContext} ctx
 */
async function handle(ctx, opt) {
    let options = parseOptions(opt);
    let developers = JSON.parse(process.env.BOT_OWNERS);

    if (options.onlyDevs && !developers.includes(ctx.author.id))
        throw new Error(
            ctx.t("errors:notOwner")
        );
}

module.exports.handle = handle;