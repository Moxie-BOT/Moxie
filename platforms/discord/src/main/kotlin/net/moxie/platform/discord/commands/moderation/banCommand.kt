package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.checks.hasPermission
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalString
import com.kotlindiscord.kord.extensions.commands.converters.impl.user
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.ButtonStyle
import dev.kord.common.entity.Permission
import dev.kord.common.entity.Snowflake
import dev.kord.core.behavior.ban
import dev.kord.core.entity.Guild
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.ModerationCommands
import net.moxie.platform.discord.implementations.checkRolesPosition
import net.moxie.platform.discord.utilities.MoxieEmojis

@OptIn(KordPreview::class)
suspend fun ModerationCommands.banCommand(selfId: Snowflake) {
    slashCommand(::BanCommandArgs) {
        check(anyGuild, hasPermission(Permission.BanMembers))
        requirePermissions(Permission.BanMembers)

        name = "ban"
        description = "Bane um usuário do servidor, ele não poderá voltar a não ser que seja desbanido"
        autoAck = AutoAckType.PUBLIC

        action {
            val banUser = arguments.user
            val composeReason = arguments.reason?.split("|")
            val banReason = composeReason?.firstOrNull() ?: translate("publics.noneReason")

            publicFollowUp {
                if (!checkRolesPosition(
                        banUser.asMember(guild!!.id),
                        selfId,
                        guild as Guild
                    ) && banUser.id.value == user.id.value
                ) {
                    content = translate("publics.isNotPunishable", arrayOf(MoxieEmojis.ERROR))
                    return@publicFollowUp
                }
                content = translate("publics.punishmentMessage", arrayOf(Emojis.warning, banUser.tag))

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
                            respond(translate("publics.punishmentSucess", arrayOf(Emojis.tada, banUser.mention)))

                            guild?.ban(banUser.id) {
                                reason = banReason
                                if (composeReason != null && composeReason.size > 1) {
                                    val daysToDeleteMessages = composeReason.lastOrNull()?.replace("\\s".toRegex(), "")
                                        ?.toIntOrNull()
                                    if (daysToDeleteMessages != null) deleteMessagesDays = daysToDeleteMessages
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

class BanCommandArgs : Arguments() {
    val user by user("user", "Um usuário para ser banir")
    val reason by optionalString("reason", "Algum motivo para o banimento")
}
