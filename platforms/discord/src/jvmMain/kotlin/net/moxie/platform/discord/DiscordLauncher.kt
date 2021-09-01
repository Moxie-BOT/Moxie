package net.moxie.platform.discord

import com.kotlindiscord.kord.extensions.ExtensibleBot
import com.kotlindiscord.kordex.ext.common.addExtCommon
import com.kotlindiscord.kordex.ext.common.extCommonAdded
import dev.kord.common.entity.PresenceStatus
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import net.moxie.common.utils.MoxieSettings
import net.moxie.platform.discord.implementations.extensions.*
import net.moxie.platform.discord.implementations.moxieI18nBuilder

object DiscordLauncher {
    @OptIn(PrivilegedIntent::class)
    suspend fun starter() {
        val configs = MoxieSettings.instance
        val bot = ExtensibleBot(configs.discord.token) {
            // Important intents for me to work, do not change!
            intents {
                +Intents(Intent.Guilds, Intent.GuildMembers, Intent.GuildEmojis)
            }

            slashCommands {
                enabled = true
            }

            // Configure when I should speak in other languages
            i18n {
                moxieI18nBuilder()
            }

            // Commands extersions or categories, whatever you want to call
            extensions {
                add(::DiscordCommands)
                add(::EconomyCommands)
                add(::FunCommands)
                add(::ModerationCommands)
                add(::MiscCommands)
                add(::UtilityCommands)

                // Custom Emoji Extension
                addExtCommon()
            }

            presence {
                status = PresenceStatus.Online
                watching("Dogs na net | Commands with /")
            }
        }

        bot.start()
    }
}
