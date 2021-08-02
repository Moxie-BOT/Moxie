@file:AutoWired

package net.moxie.platform.discord.implementations

import dev.kord.core.behavior.reply
import dev.kord.core.entity.Message
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.argument.text.StringArgument
import dev.kord.x.commands.kord.model.KordEvent
import dev.kord.x.commands.kord.model.context.KordCommandEvent
import dev.kord.x.commands.kord.model.processor.CommandSuggester
import dev.kord.x.commands.kord.model.processor.KordContext
import dev.kord.x.commands.kord.model.processor.KordErrorHandler
import dev.kord.x.commands.model.command.Command
import dev.kord.x.commands.model.processor.CommandProcessor
import dev.kord.x.commands.model.processor.ErrorHandler
import net.moxie.platform.discord.utilities.MoxieEmojis

class MoxieCommandsErrorHandler :
    ErrorHandler<MessageCreateEvent, MessageCreateEvent, KordCommandEvent> by KordErrorHandler() {
    override suspend fun CommandProcessor.exceptionThrown(
        event: MessageCreateEvent,
        command: Command<KordCommandEvent>,
        exception: Exception,
    ) {
        event.message.channel.createMessage(
            "${MoxieEmojis.ERROR} Algo que não era pra ter acontecido, aconteceu. O provável erro foi capaz de impedir que eu executasse o comando por inteiro. Esse é o causador do problema:\n`${exception.message}`"
        )
    }

    override suspend fun CommandProcessor.notFound(event: MessageCreateEvent, command: String) {
        val mostProbable = CommandSuggester.Levenshtein.suggest(command, commands)
        if (command.length > 20) command.take(15) + "..."
        if (mostProbable == null) {
            event.message.channel.createMessage(
                "${
                    MoxieEmojis.ERROR
                } Mesmo procurando em todo lugar, não encontrei nenhum comando parecido com `$command`"
            )
            return
        }

        if (command.isNotEmpty()) event.message.channel.createMessage(
            "${
                MoxieEmojis.ERROR
            } Eu não encontrei nenhum comando parecido com `$command`, você quis dizer **${mostProbable.name}**?"
        )

        val confirmed = with(KordEvent(event)) {
            val text = read(StringArgument)
            text.startsWith("sim", true)
        }

        if (confirmed) {
            val correctedText = event.message.content.replaceFirst(command, mostProbable.name)
            val data = event.message.data.copy(content = correctedText)
            val messageCreateEvent = with(event) {
                MessageCreateEvent(Message(data, kord), guildId, member, shard, supplier)
            }
            handle(messageCreateEvent, KordContext)
        }
    }

    override suspend fun CommandProcessor.rejectArgument(
        rejection: ErrorHandler.RejectedArgument<MessageCreateEvent, MessageCreateEvent, KordCommandEvent>,
    ) = with(rejection) {
        val argType = when (rejection.argument.name) {
            "Role" -> "cargo"
            "User" -> "usuário"
            "Member" -> "membro"
            "Channel" -> "canal"
            else -> "o que quer que seja isso"
        }
        event.message.reply {
            content =
                "${MoxieEmojis.ERROR} Eu procurei em todo lugar, mas não consegui encontrar esse $argType. Eu procuro por menções e ID's!"
        }
        return@with
    }

    override suspend fun CommandProcessor.tooManyWords(
        rejection: ErrorHandler.TooManyWords<MessageCreateEvent, KordCommandEvent>,
    ) = with(rejection) {}
}
