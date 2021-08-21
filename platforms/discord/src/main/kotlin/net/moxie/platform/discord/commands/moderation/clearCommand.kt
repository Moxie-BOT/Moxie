package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.checks.hasPermission
import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalBoolean
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.Permission
import dev.kord.core.entity.channel.TextChannel
import dev.kord.x.emoji.Emojis
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import net.moxie.platform.discord.extensions.ModerationCommands

@OptIn(KordPreview::class)
suspend fun ModerationCommands.clearCommand() {
    slashCommand(::ClearCommandArgs) {
        check(anyGuild, hasPermission(Permission.ManageMessages))
        requirePermissions(Permission.ManageMessages)

        name = "clear"
        description = "Apaga mensagens de texto com base em filtos estabeliecidos"
        autoAck = AutoAckType.PUBLIC

        action {
            val textChannel = channel as TextChannel
            publicFollowUp {
                if (channel.lastMessageId == null) {
                    content = "Não existem mensagem para serem limpas"
                    return@publicFollowUp
                }
                val query =
                    textChannel.getMessagesBefore(channel.lastMessageId!!, arguments.deleteCount).filterNotNull()
                        .filter {
                            (((System.currentTimeMillis() / 1000) - it.timestamp.toEpochMilliseconds()) < 1209600) && (it.isPinned.not())
                        }.map {
                            it.id
                        }.toList()

                if (query.isEmpty()) {
                    content = "Nenhuma mensagem encontrada"
                    return@publicFollowUp
                }

                textChannel.bulkDelete(query)
                content = translate("clearCommand.sucessMessage", arrayOf(Emojis.tada, query.size))
            }
        }
    }
}

class ClearCommandArgs : Arguments() {
    val deleteCount by int("amount", "O número de mensagens a serem apagadas")
    val fromUser by optionalUser("user", "Apaga somente as mensagens enviadas pelo usuário escolhido")
    val links by optionalBoolean("links", "Apaga somente links enviados no canal")
}
