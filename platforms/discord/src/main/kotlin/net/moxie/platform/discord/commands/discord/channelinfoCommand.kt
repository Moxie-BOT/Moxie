@file:JvmName("ChannelInfoCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.discord

import dev.kord.common.Color
import dev.kord.common.entity.ChannelType
import dev.kord.common.entity.optional.value
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.kord.argument.ChannelArgument
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.utilities.MoxieEmojis
import kotlin.time.ExperimentalTime

@OptIn(ExperimentalTime::class)
@ModuleName("discord")
fun channelinfoCommand() = command("channelinfo") {
    alias("categoryinfo", "voiceinfo")
    precondition {
        if (guild == null) return@precondition run {
            respond("Você só pode usar esse comando em servidores")
            false
        }
        else true
    }
    invoke(ChannelArgument.withDefault { message.channel }) { channelBehavior ->
        val channelFound = channelBehavior.asChannel()
        respondEmbed {
            color = Color(9456380)
            description = channelFound.data.topic.value
            field("${Emojis.computer} ID do canal", true) { "`${channelFound.data.id.value}`" }
            field("${Emojis.eyes} Menção", true) { "`${channelFound.mention}`" }
            when (channelFound.type) {
                ChannelType.GuildText -> {
                    this.also {
                        title = "${MoxieEmojis.TEXT_CHANNEL_ICON} Informações de ${channelFound.data.name.value}"
                        field(
                            "${Emojis.snail} Modo lento",
                            true
                        ) {
                            if (channelFound.data.rateLimitPerUser.value != 0) "${
                                channelFound.data.rateLimitPerUser.value
                            } segundos"
                            else "Nenhum"
                        }
                        field("${Emojis.trophy} Posição", true) { "${channelFound.data.position.value}º" }
                        field("${Emojis.underage} NSFW", true) {
                            if (channelFound.data.nsfw.value == true) "Sim"
                            else "Não"
                        }
                    }
                }
                ChannelType.GuildCategory -> {
                    this.title = "${MoxieEmojis.CATEGORY_ICON} Informações de ${channelFound.data.name.value}"
                }
                ChannelType.GuildVoice -> {
                    this.also {
                        title = "${MoxieEmojis.VOICE_CHANNEL_ICON} Informações de ${channelFound.data.name.value}"
                        field("${Emojis.microphone2} Taxa de bits", true) { channelFound.data.bitrate.value.toString() }
                        field(
                            "${MoxieEmojis.DISCORD_MEMBERS} Limite de membros",
                            true
                        ) { channelFound.data.userLimit.value.toString() }
                    }
                }
                ChannelType.GuildStageVoice -> {
                    this.title = "${MoxieEmojis.STAGE_ICON} Informações de ${channelFound.data.name.value}"
                }
                /* is ChannelType.PublicGuildThread, is ChannelType.PrivateThread, is ChannelType.PublicNewsThread -> {
                    this.title = "${MoxieEmojis.PUBLIC_THREAD_ICON} Informações de ${channelFound.data.name.value}"
                    this.field("${MoxieEmojis.MESSAGES_ICON} Mensagens totais", true) {
                        channelFound.data.messageCount.value.toString()
                    }
                    this.field("${MoxieEmojis.DISCORD_MEMBERS} Quantidade de membros", true) {
                        channelFound.data.memberCount.value.toString()
                    }
                }*/
                ChannelType.GuildNews -> {
                    this.title = "${MoxieEmojis.DISCORD_STORE_CHANNEL} Informações de ${channelFound.data.name.value}"
                }
                else -> {
                    this.title = "Informações de ${channelFound.data.name.value}"
                }
            }
            field(
                "${Emojis.calendar} Criado",
                true
            ) { "<t:${channelFound.id.timeStamp.toEpochMilliseconds() / 1000}:R>" }
        }
    }
}
