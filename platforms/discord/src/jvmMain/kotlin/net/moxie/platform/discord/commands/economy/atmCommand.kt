package net.moxie.platform.discord.commands.economy

import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import net.moxie.database.dao.UserDao
import net.moxie.platform.discord.implementations.extensions.EconomyCommands
import org.jetbrains.exposed.sql.transactions.transaction

@OptIn(KordPreview::class)
suspend fun EconomyCommands.atmCommand() {
    slashCommand(::AtmCommandArgs) {
        guild(849429923630153788)
        name = "atm"
        description = "Mostra a quantidade de desejos que você ou um usuário possui"
        autoAck = AutoAckType.PUBLIC

        action {
            val userProvided = arguments.user ?: user
            val userWishes = transaction {
                UserDao.findById(userProvided.id.value)?.wishes ?: 0L
            }

            publicFollowUp {
                content =
                    if (userProvided.id.value == user.id.value) translate("atmCommand.youHave",
                        arrayOf(userWishes.toString()))
                    else translate("atmCommand.userHas", arrayOf(userWishes))
            }
        }
    }
}

private class AtmCommandArgs : Arguments() {
    val user by optionalUser("user", "Um usuário para que eu possa mostrar a quantidade de desejos dele(a)")
}
