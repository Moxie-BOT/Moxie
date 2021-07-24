package discord.essentials.net.luis.moxie.utils

import dev.kord.core.event.gateway.ReadyEvent
import dev.kord.core.event.message.MessageCreateEvent
import discord.essentials.net.luis.moxie.utils.interfaces.IListener

class DiscordListener : IListener {
    override fun onReady(params: ReadyEvent) {
        println("${params.self.username} - Online")
    }

    override suspend fun onMessageCreated(params: MessageCreateEvent) {
        println(params.message.content)
    }
}