package net.moxie.platform.discord.commands.misc

import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.common.annotation.KordPreview
import dev.kord.common.entity.ButtonStyle
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.cache.data.EmojiData
import dev.kord.core.entity.GuildEmoji
import dev.kord.core.entity.ReactionEmoji
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.MiscCommands
import net.moxie.platform.discord.utilities.MoxieEmojis

@OptIn(KordPreview::class)
suspend fun MiscCommands.botinfoCommand(kord: Kord) {
    val moxie = kord.getSelf()
    slashCommand {
        name = "botinfo"
        description = "Algumas informações sobre mim"
        autoAck = AutoAckType.PUBLIC

        action {
            publicFollowUp {
                embed {
                    title = translate("botinfoCommand.moxie.greetings", arrayOf(Emojis.wave))
                    color = Color(9456380)
                    thumbnail {
                        url = moxie.avatar.url
                    }
                    description = translate(
                        "botinfoCommand.moxie.description",
                        arrayOf(MoxieEmojis.KOTLIN_LOGO, MoxieEmojis.KORD_LOGO)
                    )
                    field(translate("botinfoCommand.moxieInvite", arrayOf(Emojis.link)), true) {
                        translate("botinfoCommand.moxieInviteLink")
                    }
                    field(translate("botinfoCommand.moxieServer", arrayOf(Emojis.womanTippingHand)), true) {
                        translate("botinfoCommand.moxieServerLink")
                    }
                }

                components(60) {
                    interactiveButton {
                        style = ButtonStyle.Success

                        action {
                            check {
                                if (user.id.value != event.interaction.user.id.value) fail()
                                else pass()
                            }
                            stop()
                            respond("hey")
                        }
                    }
                }
            }
        }
    }
}
