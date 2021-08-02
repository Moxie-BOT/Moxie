@file:JvmName("UserinfoCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.discord

import dev.kord.common.Color
import dev.kord.core.entity.User
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.kord.argument.UserArgument
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.utilities.ParsedCommons.getParsedFlags

@ModuleName("discord")
fun userinfoCommand() = command("userinfo") {
    invoke(UserArgument.withDefault { message.author as User }) { user ->
        val flaggs = user.publicFlags?.let { getParsedFlags(it)?.joinToString("") ?: "" } ?: ""
        respondEmbed {
            thumbnail { url = user.avatar.url }
            color = Color(9456380)
            if (flaggs.length > 256) {
                title = "Informações de ${user.tag}"
                field("${Emojis.triangularFlagOnPost} Emblemas", true) { flaggs }
            } else title = "$flaggs Informações de ${user.tag}"
            field("${Emojis.computer} ID", true) { "`${user.id.value}`" }
            field("${Emojis.eyes} Menção", true) { "`${user.mention}`" }
            field("${Emojis.calendar} Criado", true) { "<t:${user.id.timeStamp.toEpochMilliseconds() / 1000}:R>" }
        }
    }
}
