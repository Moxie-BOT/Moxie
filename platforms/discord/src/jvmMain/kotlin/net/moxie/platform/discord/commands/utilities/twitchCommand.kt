package net.moxie.platform.discord.commands.utilities

import com.kotlindiscord.kord.extensions.commands.converters.impl.string
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.builder.message.create.embed
import net.carpediem.utils.TwitchRequester
import net.moxie.platform.discord.implementations.extensions.UtilityCommands
import java.util.*

@OptIn(KordPreview::class)
suspend fun UtilityCommands.twitchCommand() {
    slashCommand(::TwitchCommand) {
        guild(849429923630153788)
        name = "twitch"
        description = "Mostra informações de algum streamer da Twitch"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                val streamer = TwitchRequester(arguments.user).getStreamerCaching()
                if (streamer == null) {
                    content = "Usuário não encontardo"
                    return@publicFollowUp
                }
                embed {
                    title = streamer.displayName ?: streamer.login
                    color = Color(9456380)
                    thumbnail {
                        url = streamer.image!!
                    }
                    field(":computer: ID", true) { streamer.id.toString() }
                    field(translate("twitchCommand.viewsCount"), true) { streamer.viewCount.toString() }
                }
            }
        }
    }
}

class TwitchCommand : Arguments() {
    val user by string("user", "Um usuário da twitch")
}
