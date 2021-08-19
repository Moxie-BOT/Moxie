package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.checks.hasPermission
import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalBoolean
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Argument
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Permission
import net.moxie.platform.discord.extensions.ModerationCommands

@OptIn(KordPreview::class)
suspend fun ModerationCommands.clearCommand() {
    TODO()
    /* slashCommand(::ClearCommandArgs) {
        check(anyGuild, hasPermission(Permission.ManageMessages))
        requirePermissions(Permission.ManageMessages)

        name = "clear"
        description = "Apaga mensagens de texto com base em filtos estabeliecidos"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                content = translate("clearCommand.sucessMessage")
            }
        }
    }*/
}

class ClearCommandArgs : Arguments() {
    val deleteCount by int("amount", "O número de mensagens a serem apagadas")
    val fromUser by optionalUser("user", "Apaga somente as mensagens enviadas pelo usuário escolhido")
    val links by optionalBoolean("links", "Apaga somente links enviados no canal")
}
