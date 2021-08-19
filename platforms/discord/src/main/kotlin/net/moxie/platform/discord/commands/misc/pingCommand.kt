package net.moxie.platform.discord.commands.misc

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.core.Kord
import dev.kord.core.behavior.interaction.edit
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.MiscCommands

@OptIn(KordPreview::class)
suspend fun MiscCommands.pingCommand(kord: Kord) {
    slashCommand {
        name = "ping"
        description = "Um simples comando para saber se estou funcionando como deveria"
        autoAck = AutoAckType.PUBLIC

        action {
            val response = publicFollowUp {
                content =
                    "...."
            }
            response.edit {
                content = translate(
                    "pingCommand.pingMessage",
                    arrayOf(
                        Emojis.pingPong,
                        Emojis.computer,
                        System.currentTimeMillis() - response.message.timestamp.toEpochMilliseconds(),
                        Emojis.satellite,
                        kord.gateway.averagePing
                    )
                )
            }
        }
    }
}
