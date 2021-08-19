package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.commands.converters.impl.role
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.DiscordCommands
import net.moxie.platform.discord.utilities.MoxieEmojis
import net.moxie.platform.discord.utilities.ParsedCommons

suspend fun DiscordCommands.roleinfoCommand() {
    slashCommand(::RoleInfoCommandArgs) {
        check(anyGuild)

        name = "roleinfo"
        description = "Mostra informações de algum cargo do servidor"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                val perms = ParsedCommons.getParsedPerms(arguments.role.permissions.values)
                embed {
                    title = "${MoxieEmojis.ROLES_ICON} | ${arguments.role.name}"
                    color = Color(9456380)
                    field("${Emojis.computer} ID", true) { "`${arguments.role.id.value}`" }
                    field(
                        translate("roleinfoCommand.mentionTitle", arrayOf(MoxieEmojis.DISCORD_MENTION_ICON)),
                        true
                    ) { "`${arguments.role.mention}`" }
                    field(translate("roleinfoCommand.color", arrayOf(Emojis.art)), true) {
                        String.format(
                            "#%02X%02X%02X",
                            arguments.role.color.red, arguments.role.color.green,
                            arguments.role.color.blue
                        )
                    }
                    field(translate("roleinfoCommand.hoisted", arrayOf(Emojis.question)), true) {
                        if (arguments.role.hoisted) "Sim"
                        else "Não"
                    }
                    field(translate("roleinfoCommand.mentionable", arrayOf(Emojis.question)), true) {
                        if (arguments.role.mentionable) "Sim"
                        else "Não"
                    }
                    field(translate("publics.createdAt", arrayOf(Emojis.calendar)), true) {
                        "<t:${arguments.role.id.timeStamp.toEpochMilliseconds() / 1000}:R>"
                    }
                    field(
                        translate(
                            "publics.permissions",
                            arrayOf(Emojis.nameBadge)
                        )
                    ) { "`${perms?.joinToString(", ") ?: "Nenhuma"}`" }
                }
            }
        }
    }
}

class RoleInfoCommandArgs : Arguments() {
    val role by role("role", "Um cargo para mostrar as informações sobre ele")
}
