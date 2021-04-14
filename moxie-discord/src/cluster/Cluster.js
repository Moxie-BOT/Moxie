const Client = require("../Client");
init();

function init() {
    const client = new Client(process.env.DISCORD_TOKEN, {
        defaultImageFormat: "png",
        restMode: true,
        maxShards: parseInt(process.env.TOTAL_SHARDS),
        defaultImageSize: 2048,
        getAllUsers: true,
        allowedMentions: {
            everyone: false,
            roles: false,
            users: true,
            replied_user: true,
        },
        intents: [
            "guilds",
            "guildMembers",
            "guildBans",
            "guildEmojis",
            "guildIntegrations",
            "guildWebhooks",
            "guildInvites",
            "guildVoiceStates",
            "guildMessages",
            "guildMessageReactions",
            "directMessages",
            "directMessageReactions",
        ],
        disableEvents: {
            CHANNEL_CREATE: true,
            CHANNEL_UPDATE: true,
            GUILD_BAN_ADD: true,
            GUILD_BAN_REMOVE: true,
            GUILD_MEMBER_ADD: true,
            GUILD_MEMBER_REMOVE: true,
            GUILD_MEMBER_UPDATE: true,
            GUILD_ROLE_CREATE: true,
            GUILD_ROLE_DELETE: true,
            GUILD_ROLE_UPDATE: true,
            GUILD_UPDATE: true,
            MESSAGE_DELETE_BULK: true,
            PRESENCE_UPDATE: true,
            TYPING_START: true,
            USER_UPDATE: true,
        },
    });
    client.connect();
}
