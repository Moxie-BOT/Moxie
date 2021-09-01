package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import net.moxie.platform.discord.commands.economy.atmCommand

open class EconomyCommands : Extension() {
    override val name = "Economy"
    override val bundle = "economy-commands"

    override suspend fun setup() {
        atmCommand()
    }
}
