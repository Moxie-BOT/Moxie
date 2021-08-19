package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.checks.hasPermission
import com.kotlindiscord.kord.extensions.commands.converters.impl.member
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalString
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.ButtonStyle
import dev.kord.common.entity.Permission
import dev.kord.common.entity.Snowflake
import dev.kord.core.entity.Guild
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.ModerationCommands
import net.moxie.platform.discord.implementations.checkRolesPosition
import net.moxie.platform.discord.utilities.MoxieEmojis

@OptIn(KordPreview::class)
suspend fun ModerationCommands.kickCommand(selfId: Snowflake) {
    slashCommand(::KickCommandArgs) {
        check(anyGuild, hasPermission(Permission.KickMembers))
        requirePermissions(Permission.KickMembers)

        name = "kick"
        description = "Expulsa um usuário do seu servidor, ele poderá voltar mais tarde"
        autoAck = AutoAckType.PUBLIC

        action {
            val memberToKick = arguments.member.asMember()
            val reason = arguments.reason ?: translate("publics.noneReason")

            publicFollowUp {
                if (!checkRolesPosition(
                        memberToKick,
                        selfId,
                        guild as Guild
                    ) && memberToKick.id.value == user.id.value
                ) {
                    content = translate("publics.isNotPunishable", arrayOf(MoxieEmojis.ERROR))
                    return@publicFollowUp
                }
                content = translate("publics.punishmentMessage", arrayOf(Emojis.warning, memberToKick.tag))

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

                            guild?.kick(memberToKick.id, reason)
                            respond(translate("publics.punishmentSucess", arrayOf(Emojis.tada, memberToKick.mention)))
                        }
                    }
                }
            }
        }
    }
}

class KickCommandArgs : Arguments() {
    val member by member("member", "Um membro para eu expulsar")
    val reason by optionalString("reason", "Algum motivo para o kick")
}
