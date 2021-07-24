package discord.essentials.net.luis.moxie.utils.interfaces

import dev.kord.core.event.gateway.ReadyEvent
import dev.kord.core.event.message.MessageCreateEvent

interface IListener {
    fun onReady(params: ReadyEvent) {}
    suspend fun onMessageCreated(params: MessageCreateEvent) {}
}