package net.moxie.platform.discord.implementations.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension

open class FunCommands : Extension() {
    override val name = "Fun"
    override val bundle = "fun-commands"

    override suspend fun setup() {
    }
}
