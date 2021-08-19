package net.moxie.platform.discord.extensions

import com.kotlindiscord.kord.extensions.extensions.Extension
import dev.kord.common.annotation.KordPreview
import net.moxie.platform.discord.commands.moderation.banCommand
import net.moxie.platform.discord.commands.moderation.clearCommand
import net.moxie.platform.discord.commands.moderation.kickCommand
import net.moxie.platform.discord.commands.moderation.pruneMembersCommand

class ModerationCommands : Extension() {
    override val bundle = "commands"
    override val name = "moderation"

    @KordPreview
    override suspend fun setup() {
        banCommand(kord.selfId)
        kickCommand(kord.selfId)
        pruneMembersCommand()
        // clearCommand()
    }
}
