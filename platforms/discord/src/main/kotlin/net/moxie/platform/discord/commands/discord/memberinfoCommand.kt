@file:JvmName("MemberInfoCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.discord

import dev.kord.common.Color
import dev.kord.core.entity.Member
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.kord.argument.MemberArgument
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.utilities.MoxieEmojis
import net.moxie.platform.discord.utilities.ParsedCommons

@ModuleName("discord")
fun memberinfoCommand() = command("memberinfo") {
    precondition {
        if (guild == null) return@precondition run {
            respond("Você só pode usar esse comando em servidores")
            false
        }
        else true
    }
    invoke(MemberArgument.withDefault { message.getAuthorAsMember() as Member }) { member ->
        val perms = ParsedCommons.getParsedPerms(member.getPermissions().values)
        respondEmbed {
            color = Color(9456380)
            title = "${MoxieEmojis.WUMPUS} Informações de ${member.nickname ?: member.username}"
            thumbnail { url = member.avatar.url }
            field("${Emojis.book} Tag", true) { "`${member.tag}`" }
            field("${Emojis.computer} ID", true) { "`${member.id.value}`" }
            field("${Emojis.eyes} Menção", true) { "`${member.mention}`" }
            field("${Emojis.calendar} Entrou há", true) {
                "<t:${member.joinedAt.toEpochMilliseconds() / 1000}:R>"
            }
            if (member.premiumSince != null) field("${Emojis.rocket} Booster", true) {
                "<t:${member.premiumSince!!.toEpochMilliseconds() / 1000}:R>"
            }
            if (perms != null) field("${Emojis.nameBadge} Permissões") { "`${perms.joinToString(", ")}`" }
        }
    }
}
