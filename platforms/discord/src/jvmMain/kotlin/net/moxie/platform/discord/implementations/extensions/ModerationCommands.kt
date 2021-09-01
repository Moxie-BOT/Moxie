package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import net.moxie.platform.discord.commands.moderation.banCommand

open class ModerationCommands : Extension() {
    override val name = "Moderation"
    override val bundle = "moderation-commands"

    override suspend fun setup() {
        banCommand()
    }
}
