@file:JvmName("AvatarCommand")
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

@ModuleName("discord")
fun avatarCommand() = command("avatar") {
    invoke(UserArgument.withDefault { message.author as User }) { user ->
        respondEmbed {
            val avatarURL = user.avatar.url
            color = Color(9456380)
            title = "${Emojis.framePhoto} Avatar de ${user.tag}"
            description = "**Baixe clicando [aqui]($avatarURL)**"
            image = "$avatarURL?size=4096"
        }
    }
}
