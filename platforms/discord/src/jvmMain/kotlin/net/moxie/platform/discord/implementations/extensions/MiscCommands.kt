package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import net.moxie.platform.discord.commands.misc.pingCommand

open class MiscCommands : Extension() {
    override val name = "Misc"
    override val bundle = "misc-commands"

    override suspend fun setup() {
        pingCommand()
    }
}
