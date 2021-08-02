@file:AutoWired

package net.moxie.platform.discord

import dev.kord.core.Kord
import dev.kord.core.supplier.EntitySupplyStrategy
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.kord.bot
import dev.kord.x.commands.kord.model.prefix.mention
import dev.kord.x.commands.kord.model.processor.KordContext
import dev.kord.x.commands.kord.model.processor.KordContextConverter
import dev.kord.x.commands.model.prefix.literal
import dev.kord.x.commands.model.prefix.or
import dev.kord.x.commands.model.processor.BaseEventHandler
import kapt.kotlin.generated.configure
import net.moxie.platform.discord.implementations.MoxieCommandsErrorHandler
import net.moxie.platform.discord.settings.DiscordSettings
import net.moxie.platform.discord.settings.getSettings
import java.security.Security

val configs = getSettings<DiscordSettings>("configuration/common/discord.conf")

@OptIn(PrivilegedIntent::class)
suspend fun main() = bot(Kord(configs.client.token) {
    intents = Intents(Intent.GuildMembers, Intent.GuildMessages, Intent.DirectMessages)
    // Cache Strategy
    defaultStrategy = EntitySupplyStrategy.cachingRest
}) {
    // Resolve WARN NativePRNGNonBlocking is not found
    System.setProperty("io.ktor.random.secure.random.provider", "DRBG")
    Security.setProperty("securerandom.drbg.config", "HMAC_DRBG,SHA-512,256,pr_and_reseed")
    // Configure kapt. Use Java 11!!
    configure()
    eventHandlers[KordContext] = BaseEventHandler(KordContext, KordContextConverter, MoxieCommandsErrorHandler())
    prefix {
        add(KordContext) {
            literal(configs.client.prefix) or mention()
        }
    }
    // databaseInitializer()
}
