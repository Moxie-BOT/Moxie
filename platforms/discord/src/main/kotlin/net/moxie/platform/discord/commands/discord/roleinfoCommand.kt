@file:JvmName("RoleInfoCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.discord

import dev.kord.common.Color
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.kord.argument.RoleArgument
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.utilities.MoxieEmojis
import net.moxie.platform.discord.utilities.ParsedCommons

@ModuleName("discord")
fun roleinfoCommand() = command("roleinfo") {
    precondition {
        if (guild == null) return@precondition run {
            respond("Você só pode usar esse comando em servidores")
            false
        }
        else true
    }
    invoke(RoleArgument) { role ->
        val perms = ParsedCommons.getParsedPerms(role.permissions.values)
        respondEmbed {
            title = "${MoxieEmojis.ROLES_ICON} Informações de ${role.name}"
            color = Color(9456380)
            field("${Emojis.computer} ID", true) { "`${role.id.value}`" }
            field("${MoxieEmojis.DISCORD_MENTION_ICON} Menção", true) { "`${role.mention}`" }
            field("${Emojis.art} Cor", true) {
                String.format("#%02X%02X%02X", role.color.red, role.color.green, role.color.blue)
            }
            field("${Emojis.question} Exibir separadamente", true) {
                if (role.hoisted) "Sim"
                else "Não"
            }
            field("${Emojis.question} Mencionável", true) {
                if (role.mentionable) "Sim"
                else "Não"
            }
            field("${Emojis.calendar} Criado", true) { "<t:${role.id.timeStamp.toEpochMilliseconds() / 1000}:R>" }
            if (perms != null) field("${Emojis.nameBadge} Permissões") { "`${perms.joinToString(", ")}`" }
        }
    }
}
