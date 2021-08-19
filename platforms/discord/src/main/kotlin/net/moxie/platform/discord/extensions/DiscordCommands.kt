package net.moxie.platform.discord.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import net.moxie.platform.discord.commands.discord.*

class DiscordCommands : Extension() {
    override val bundle = "commands"
    override val name = "discord"

    @KordPreview
    override suspend fun setup() {
        avatarCommand()
        bannerCommand()
        channelinfoCommand()
        userinfoCommand()
        roleinfoCommand()
    }
}
