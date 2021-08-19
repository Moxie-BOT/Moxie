package net.moxie.platform.discord.commands.moderation

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.commands.converters.impl.int
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalString
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.ButtonStyle
import dev.kord.common.entity.Permission
import dev.kord.common.entity.Snowflake
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.ModerationCommands
import net.moxie.platform.discord.utilities.MoxieEmojis

@OptIn(KordPreview::class)
suspend fun ModerationCommands.pruneMembersCommand() {
    slashCommand(::PruneMembersCommandArgs) {
        check(anyGuild)
        requirePermissions(Permission.BanMembers)
        check {
            if (event.interaction.user.asMember(Snowflake(guild!!.value)).isOwner()) pass()
            else fail()
        }

        name = "prune-members"
        description = "Expulsa membros inativos do seu servidor"
        autoAck = AutoAckType.PUBLIC

        action {
            val membersToPrune = guild?.getPruneCount(arguments.daysInactivity)
            val daysInactivity = arguments.daysInactivity
            val reason = arguments.reason

            publicFollowUp {
                if (membersToPrune == 0) {
                    content = translate("pruneMembers.noIdleUsers", arrayOf(MoxieEmojis.ERROR))
                    return@publicFollowUp
                }
                content = translate("pruneMembers.confirmMessage", arrayOf(Emojis.warning, membersToPrune))

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

                            respond(translate("pruneMembers.sucessClearMessage", arrayOf(Emojis.tada, daysInactivity)))
                            guild?.prune(daysInactivity, reason)
                        }
                    }
                }
            }
        }
    }
}

class PruneMembersCommandArgs : Arguments() {
    val daysInactivity by int("days", description = "A quantidade de dias máxima de inatividade")
    val reason by optionalString("reason", description = "Algum motivo para a limpa")
}
