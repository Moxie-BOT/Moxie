package net.moxie.platform.discord.commands.misc

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import net.moxie.platform.discord.extensions.MiscCommands

suspend fun MiscCommands.inviteCommand() {
    slashCommand {
        name = "invite"
        description = "Me convide para o seu servidor ʕ•́ᴥ•̀ʔっ♡"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                embed {
                    color = Color(9456380)
                    description = translate("inviteinfoCommand.descriptionInvite")
                }
            }
        }
    }
}
