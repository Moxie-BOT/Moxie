@file:JvmName("MessageCreatedListener")
package net.luis.moxie.listeners

import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on

fun Kord.setupMessageCreatedListener() = on<MessageCreateEvent> {
    println(message.content)
}