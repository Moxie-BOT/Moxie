package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import net.moxie.platform.discord.implementations.extensions.DiscordCommands

@OptIn(KordPreview::class)
suspend fun DiscordCommands.avatarCommand() {
    slashCommand(::AvatarCommandArgs) {
        guild(849429923630153788)
        name = "avatar"
        description = "Mostra o avatar de algum usuário no servidor"
        autoAck = AutoAckType.PUBLIC

        action {
            val userProvided = arguments.user ?: user.asUser()

            publicFollowUp {
                embed {
                    color = Color(9456380)
                    title = translate("avatarCommand.avatarFrom", arrayOf(userProvided.tag))
                    description = translate("avatarCommand.downloadAvatarHere", arrayOf(userProvided.avatar.url))
                    image = "${userProvided.avatar.url}?size=4096"
                }
            }
        }
    }
}

private class AvatarCommandArgs : Arguments() {
    val user by optionalUser("user", "Um usuário para que eu possa mostrar o avatar dele(a)")
}
