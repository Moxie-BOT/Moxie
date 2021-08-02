@file:AutoWired

package net.moxie.platform.discord.listeners

import dev.kord.core.event.gateway.ReadyEvent
import dev.kord.core.kordLogger
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.kord.plug.on

fun readyListener() = on<ReadyEvent> {
    kordLogger.info("Logged in ${kord.getSelf().tag}")
}
