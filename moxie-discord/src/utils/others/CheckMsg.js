const Collector = require("../Collector");

module.exports.CheckMsg = async function (ctx, action, options = {}) {
    if (options.me && !action) {
        const msg = await ctx.reply("É uma pena que você não me queria mais em seu servidor. Eu não consigo banir a mim mesmo por limitações do Discord, mas eu posso sair do seu servidor... Para confirmar clique em ✅");
        msg.addReaction("✅").then(r => {})

        const filter = (r, user) => (r.name === "✅") && user === ctx.author;
        const collector = new Collector.ReactionCollector(ctx.client, msg, filter, {time: 80000, max: 1});
        collector.on("collect", () => {
            ctx.guild.leave();
        })
        return;
    }
    const {settings} = await ctx.client.database.users.get(ctx.author.id);
    if (options.punishmentTxt) {
        const {prefix} = await ctx.client.guildCache.get(ctx.guild.id);
        options.stringSucess = "🎉 Usuário punido! Fazer coisas feias tem consequências, sabia?"
        options.stringQuestion += `\n🔹 É fácil pular mensagens de punição! Usando \`${prefix}quickpunishment\` você poderá ativar e desativar essas mensagens.`
    }
    if (settings.autocheck) await ctx.reply(options.stringSucess) && action(ctx);
    else {
        const msg = await ctx.reply(options.stringQuestion)
        msg.addReaction("✅").then(r => {})
        const filter = (r, user) => (r.name === "✅") && user === ctx.author;
        const collector = new Collector.ReactionCollector(ctx.client, msg, filter, {time: 80000, max: 1});
        collector.on("collect", async () => {
            msg.delete();
            await ctx.reply(options.stringSucess);
            return action(ctx)
        })
    }
}