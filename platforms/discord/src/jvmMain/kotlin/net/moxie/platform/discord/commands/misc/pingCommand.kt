package net.moxie.platform.discord.commands.misc

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.core.Kord
import net.moxie.platform.discord.implementations.extensions.MiscCommands
import org.koin.core.component.inject
import kotlin.time.ExperimentalTime

@OptIn(KordPreview::class, ExperimentalTime::class)
suspend fun MiscCommands.pingCommand() {
    slashCommand {
        guild(849429923630153788)
        name = "ping"
        description = "Mostra minha latência, saiba se estou com lag ou não!"
        autoAck = AutoAckType.PUBLIC
        val kord: Kord by inject()

        val timeAct = System.currentTimeMillis()
        action {
            publicFollowUp {
                content = translate(
                    "pingCommand.pingMessage",
                    arrayOf(
                        (System.currentTimeMillis() - timeAct).toString(),
                        kord.gateway.averagePing
                    )
                )
            }
        }
    }
}
