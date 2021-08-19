package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.DiscordCommands
import net.moxie.platform.discord.utilities.ParsedCommons.getParsedFlags
import net.moxie.platform.discord.utilities.ParsedCommons.getParsedPerms

suspend fun DiscordCommands.userinfoCommand() {
    slashCommand(::UserinfoCommandArgs) {
        name = "userinfo"
        description = "Mostra informações de algum usuário do discord"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                embed {
                    val user = arguments.user ?: user.asUser()
                    val member = user.asMemberOrNull(guild!!.id)
                    val flaggs = user.publicFlags?.let { getParsedFlags(it)?.joinToString("") ?: "" } ?: ""

                    thumbnail { url = user.avatar.url }
                    color = Color(9456380)

                    if (flaggs.length > 256) {
                        title = user.tag
                        field("${Emojis.triangularFlagOnPost} Emblemas", true) { flaggs }
                    } else title = "$flaggs ${user.tag}"

                    field("${Emojis.computer} ID", true) { "`${user.id.value}`" }
                    field(translate("publics.createdAt", arrayOf(Emojis.calendar)), true) {
                        "<t:${user.id.timeStamp.toEpochMilliseconds() / 1000}:R>"
                    }

                    if (guild == null || member == null) return@embed

                    field(translate("userinfoCommand.joinedAt", arrayOf(Emojis.calendar)), true) {
                        "<t:${member.joinedAt.toEpochMilliseconds() / 1000}:R>"
                    }
                    if (member.premiumSince != null) field(
                        translate(
                            "userinfoCommand.boosterAt",
                            arrayOf(Emojis.rocket)
                        ), true
                    ) {
                        "<t:${member.premiumSince!!.toEpochMilliseconds() / 1000}:R>"
                    }
                    val perms = getParsedPerms(member.getPermissions().values)
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

class UserinfoCommandArgs : Arguments() {
    val user by optionalUser("user", "Um usuário para mostrar as informações sobre ele")
}
