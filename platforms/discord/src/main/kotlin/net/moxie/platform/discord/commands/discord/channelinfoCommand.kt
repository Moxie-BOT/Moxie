package net.moxie.platform.discord.commands.discord

import com.kotlindiscord.kord.extensions.checks.anyGuild
import com.kotlindiscord.kord.extensions.commands.converters.impl.optionalChannel
import com.kotlindiscord.kord.extensions.commands.parser.Arguments
import com.kotlindiscord.kord.extensions.commands.slash.AutoAckType
import dev.kord.common.Color
import dev.kord.common.entity.ChannelType
import dev.kord.common.entity.optional.value
import dev.kord.rest.builder.message.create.embed
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.extensions.DiscordCommands
import net.moxie.platform.discord.utilities.MoxieEmojis

suspend fun DiscordCommands.channelinfoCommand() {
    slashCommand(::ChannelInfoArgs) {
        check(anyGuild)

        name = "channelinfo"
        description = "Mostra informações de algum canal do servidor"
        autoAck = AutoAckType.PUBLIC

        action {
            val channelFound = (arguments.channel ?: channel).asChannel()
            publicFollowUp {
                embed {
                    color = Color(9456380)
                    description = channelFound.data.topic.value
                    field("${Emojis.computer} ID", true) { "`${channelFound.data.id.value}`" }
                    field(
                        translate(
                            "channelinfoCommand.mentionTitle", arrayOf(Emojis.eyes)
                        ), true
                    ) { "`${channelFound.mention}`" }

                    when (channelFound.type) {
                        ChannelType.GuildText -> {
                            this.also {
                                title =
                                    "${MoxieEmojis.TEXT_CHANNEL_ICON} | ${channelFound.data.name.value}"
                                field(
                                    translate("channelinfoCommand.slowMode", arrayOf(Emojis.snail)),
                                    true
                                ) {
                                    translate(
                                        "channelinfoCommand.slowModeDuration",
                                        arrayOf(channelFound.data.rateLimitPerUser.value)
                                    )
                                }
                                field(
                                    translate("channelinfoCommand.channelPosition", arrayOf(Emojis.trophy)), true
                                ) { "${channelFound.data.position.value}º" }
                                field("${Emojis.underage} NSFW", true) {
                                    translate("channelinfoCommand.NSFWBoolean", arrayOf(channelFound.data.nsfw.value))
                                }
                            }
                        }

                        ChannelType.GuildCategory -> {
                            this.title = "${MoxieEmojis.CATEGORY_ICON} | ${channelFound.data.name.value}"
                        }

                        ChannelType.GuildVoice -> {
                            this.also {
                                title =
                                    "${MoxieEmojis.VOICE_CHANNEL_ICON} | ${channelFound.data.name.value}"
                                field(
                                    translate("channelinfoCommand.bitRate", arrayOf(Emojis.microphone2)),
                                    true
                                ) { channelFound.data.bitrate.value.toString() }
                                field(
                                    translate("channelinfoCommand.userLimit", arrayOf(MoxieEmojis.DISCORD_MEMBERS)),
                                    true
                                ) { channelFound.data.userLimit.value.toString() }
                            }
                        }

                        ChannelType.GuildStageVoice -> {
                            this.title = "${MoxieEmojis.STAGE_ICON} | ${channelFound.data.name.value}"
                        }

                        is ChannelType.PublicGuildThread, is ChannelType.PrivateThread, is ChannelType.PublicNewsThread -> {
                            this.title =
                                "${MoxieEmojis.PUBLIC_THREAD_ICON} | ${channelFound.data.name.value}"
                            this.field("${MoxieEmojis.MESSAGES_ICON} Mensagens totais", true) {
                                channelFound.data.messageCount.value.toString()
                            }
                            this.field("${MoxieEmojis.DISCORD_MEMBERS} Quantidade de membros", true) {
                                channelFound.data.memberCount.value.toString()
                            }
                        }

                        ChannelType.GuildNews -> {
                            this.title =
                                "${MoxieEmojis.CHANNEL_NEWS} | ${channelFound.data.name.value}"
                        }

                        else -> {
                            this.title = "${channelFound.data.name.value}"
                        }
                    }
                    field(
                        translate("publics.createdAt", arrayOf(Emojis.calendar)),
                        true
                    ) { "<t:${channelFound.id.timeStamp.toEpochMilliseconds() / 1000}:R>" }
                }
            }
        }
    }
}

class ChannelInfoArgs : Arguments() {
    val channel by optionalChannel("channel", "Um canal para que eu possa mostrar suas informações")
}
