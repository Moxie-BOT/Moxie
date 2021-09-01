package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import net.moxie.platform.discord.commands.discord.avatarCommand

open class DiscordCommands : Extension() {
    override val name = "Discord"
    override val bundle = "discord-commands"

    override suspend fun setup() {
        avatarCommand()
    }
}
