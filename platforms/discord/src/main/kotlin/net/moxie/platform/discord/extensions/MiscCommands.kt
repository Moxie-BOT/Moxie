package net.moxie.platform.discord.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import net.moxie.platform.discord.commands.misc.botinfoCommand
import net.moxie.platform.discord.commands.misc.inviteCommand
import net.moxie.platform.discord.commands.misc.pingCommand

class MiscCommands : Extension() {
    override val bundle = "commands"
    override val name = "miscellaneous"

    @KordPreview
    override suspend fun setup() {
        pingCommand(kord)
        inviteCommand()
        botinfoCommand(kord)
    }
}
