package net.moxie.platform.discord.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import net.moxie.platform.discord.commands.utilities.twitchCommand

class UtilitiesCommands : Extension() {
    override val bundle = "commands"
    override val name = "utilities"

    @KordPreview
    override suspend fun setup() {
        twitchCommand()
    }
}
