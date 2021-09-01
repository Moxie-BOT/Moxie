package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import net.moxie.platform.discord.commands.utilities.twitchCommand

open class UtilityCommands : Extension() {
    override val name = "Utilities"
    override val bundle = "utilities-commands"

    override suspend fun setup() {
        twitchCommand()
    }
}
