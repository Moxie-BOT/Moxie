package net.moxie.platform.discord.commands.utilities

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import net.moxie.platform.discord.extensions.UtilitiesCommands

suspend fun UtilitiesCommands.twitchCommand() {
    TODO()
    /* slashCommand(::TwitchCommandArgs) {
        name = "twitch"
        description = "Mostra informações de usuário na tiwtch"
        autoAck = AutoAckType.PUBLIC

        action {
            val userProvided = arguments.user
            publicFollowUp {
                embed {
                    color = Color(9456380)
                }
            }
        }
    } */
}

class TwitchCommandArgs : Arguments() {
    val user by string("user", "O nome ou id de um usuário na twitch")
}
