package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.DiscordCommands

suspend fun DiscordCommands.avatarCommand() {
    slashCommand(::AvatarCommandArgs) {
        name = "avatar"
        description = "Mostra o avatar de qualquer usuário do discord"
        autoAck = AutoAckType.PUBLIC

        action {
            val userProvided = arguments.user ?: user.asUser()

            publicFollowUp {
                embed {
                    color = Color(9456380)
                    title =
                        translate("avatarCommand.avatarFrom", arrayOf(Emojis.framePhoto, userProvided.tag))
                    description = translate("avatarCommand.downloadAvatarHere", arrayOf(userProvided.avatar.url))
                    image = "${userProvided.avatar.url}?size=4096"
                }
            }
        }
    }
}

class AvatarCommandArgs : Arguments() {
    val user by optionalUser("user", "Um usuário ou nenhum para que eu possa mostrar o avatar")
}
