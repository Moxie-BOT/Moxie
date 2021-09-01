package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.CommandException
import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.checks.hasPermission
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalInt
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalString
import com.kotlindiscord.kord.extensions.commands.converters.impl.user
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import com.kotlindiscord.kordex.ext.common.extensions.EmojiExtension
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.ButtonStyle
import dev.kord.common.entity.Permission
import dev.kord.core.behavior.ban
import net.moxie.platform.discord.implementations.checkRolesPosition
import net.moxie.platform.discord.implementations.extensions.ModerationCommands

@OptIn(KordPreview::class)
suspend fun ModerationCommands.banCommand() {
    slashCommand(::BanCommandArgs) {
        check(anyGuild, hasPermission(Permission.BanMembers))
        requirePermissions(Permission.BanMembers)

        guild(849429923630153788)
        name = "ban"
        description = "Bane um usuário do seu servidor"
        autoAck = AutoAckType.PUBLIC

        action {
            val userToBan = arguments.user.asUser()
            val banReason = arguments.reason?.take(512)
            val days = arguments.days

            publicFollowUp {
                if (!checkRolesPosition(userToBan.asMemberOrNull(guild!!.id), guild!!.asGuild())) {
                    content = translate("publics.unpunished", arrayOf(EmojiExtension.getEmoji("error")))
                    return@publicFollowUp
                }
                content = translate("publics.punishmentMessage", arrayOf(userToBan.tag, userToBan.id.value))

                components(60) {
                    interactiveButton {
                        style = ButtonStyle.Success
                        label = translate("publics.buttonConfirm")

                        action {
                            check {
                                if (user.id.value != event.interaction.user.id.value) fail()
                                else pass()
                            }
                            stop()
                            respond(translate("publics.punishmentSucess", arrayOf(userToBan.mention)))

                            guild?.ban(userToBan.id) {
                                reason = banReason ?: translate("publics.reason", arrayOf(userToBan.tag))
                                deleteMessagesDays = days ?: 0
                            }
                        }
                    }
                }
            }
        }
    }
}

private class BanCommandArgs : Arguments() {
    val user by user("user", "Um usuário para banir")
    val reason by optionalString("reason", "Um motivo para eu por no banimento")
    val days by optionalInt("days",
        "Apaga todas as mensagens enviadas pelo usuário dentro da quantidade de dias", true) { _, value ->
        if (value != null && (value <= 0 || value > 7)) throw CommandException(translate("banCommand.invalidDays",
            arrayOf(EmojiExtension.getEmoji("error"))))
    }
}
