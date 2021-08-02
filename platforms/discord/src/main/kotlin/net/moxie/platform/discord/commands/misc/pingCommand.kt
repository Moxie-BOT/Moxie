@file:JvmName("PingCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.misc

import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import kotlin.time.ExperimentalTime

@ModuleName("misc")
@OptIn(ExperimentalTime::class)
fun pingCommand() = command("ping") {
    invoke {
        respond(
            "\uD83C\uDFD3 Pong!\n\uD83D\uDCBB Latência -> **${
                System.currentTimeMillis() - message.timestamp.toEpochMilliseconds()
            }ms**\n\uD83D\uDCE1 Latência da API -> **${kord.gateway.averagePing}**"
        )
    }
}
