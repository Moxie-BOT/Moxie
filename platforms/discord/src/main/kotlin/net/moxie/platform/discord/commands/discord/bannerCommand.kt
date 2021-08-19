package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalUser
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.rest.Image
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.DiscordCommands
import net.moxie.platform.discord.utilities.MoxieEmojis

@OptIn(KordPreview::class)
suspend fun DiscordCommands.bannerCommand() {
    slashCommand {
        name = "banner"
        description = "Mostra o banner de um usuário ou servidor"

        subCommand(::UserBannerCommandArgs) {
            autoAck = AutoAckType.PUBLIC
            name = "user"
            description = "Mostra o banner de algum usuário"

            action {
                publicFollowUp {
                    val userBanner = arguments.user!!.getBannerUrl(Image.Format.PNG)
                    println(userBanner)
                    if (userBanner == null) {
                        content = translate("bannerCommand.userDoesntHaveBanner", arrayOf(MoxieEmojis.ERROR))
                        return@publicFollowUp
                    }

                    embed {
                        color = Color(9456380)
                        title =
                            translate("avatarCommand.avatarFrom", arrayOf(Emojis.framePhoto, arguments.user?.tag))
                        description = translate("avatarCommand.downloadAvatarHere", arrayOf(userBanner))
                        // image = "$userBanner?size=4096"
                    }
                }
            }
        }

        subCommand {
            check(anyGuild)
            autoAck = AutoAckType.PUBLIC
            name = "server"
            description = "Mostra o banner de algum servidor"

            action {
                publicFollowUp {
                    val guildBanner = guild?.getBannerUrl(Image.Format.PNG)
                    println(guildBanner)
                    if (guildBanner == null) {
                        content = translate("bannerCommand.serverDoesntHaveBanner", arrayOf(MoxieEmojis.ERROR))
                        return@publicFollowUp
                    }

                    embed {
                        title = guild?.name
                        description = translate("avatarCommand.downloadAvatarHere", arrayOf(guildBanner))
                        image = "$guildBanner?size=4096"
                    }
                }
            }
        }
    }
}

class UserBannerCommandArgs : Arguments() {
    val user by optionalUser("user", "Um usuário ou nenhum para que eu possa mostrar o banner")
}
