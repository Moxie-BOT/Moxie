package net.moxie.platform.discord

import com.kotlindiscord.kord.extensions.ExtensibleBot
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import net.moxie.platform.discord.extensions.DiscordCommands
import net.moxie.platform.discord.extensions.MiscCommands
import net.moxie.platform.discord.extensions.ModerationCommands
import net.moxie.platform.discord.extensions.UtilitiesCommands
import net.moxie.platform.discord.settings.DiscordSettings
import net.moxie.platform.discord.settings.getSettings
import java.io.File
import java.nio.file.Files
import java.security.Security
import java.util.*
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.system.exitProcess
import kotlin.time.Duration


val configs = try {
    getSettings<DiscordSettings>("configuration/common/discord.conf")
} catch (e: Exception) {
    null
}

@OptIn(PrivilegedIntent::class, kotlin.time.ExperimentalTime::class)
suspend fun main() {
    // Resolve WARN NativePRNGNonBlocking is not found
    System.setProperty("io.ktor.random.secure.random.provider", "DRBG")
    Security.setProperty("securerandom.drbg.config", "HMAC_DRBG,SHA-512,256,pr_and_reseed")

    if (configs == null) {
        println(
            "  __  __           _      \n" +
                    " |  \\/  | _____  _(_) ___ \n" +
                    " | |\\/| |/ _ \\ \\/ / |/ _ \\\n" +
                    " | |  | | (_) >  <| |  __/\n" +
                    " |_|  |_|\\___/_/\\_\\_|\\___|\n" +
                    "                          "
        )
        println("Welcome to my code!")
        println("")
        println("So that I can start my work, I will need you to configure some files, nothing too difficult, just go to configuration/common/")
        println("After that, open each file and see how important each variable is so you can change its value")

        moveFiles("discord.conf")
        moveFiles("moxie.conf")

        exitProcess(1)
    }

    val bot = ExtensibleBot(configs.client.token) {
        intents {
            + Intents(Intent.Guilds, Intent.GuildMembers, Intent.GuildEmojis)
        }
        members {
            fillPresences = true
            all()
        }
        slashCommands {
            enabled = true
        }
        i18n {
            defaultLocale = Locale("pt", "BR")
        }
        extensions {
            help {
                // Paginator settings
                deletePaginatorOnTimeout = false
                paginatorTimeout = Duration.minutes(2).inWholeMilliseconds
                pingInReply = true
            }
            // Command Extensions
            add(::MiscCommands)
            add(::DiscordCommands)
            add(::ModerationCommands)
            add(::UtilitiesCommands)
        }
    }
    bot.start()
    // databaseInitializer()
}

fun moveFiles(fileName: String) {
    val myConfsRoot = "configuration/common/"
    val myConfSetts = Path(myConfsRoot + fileName)
    if (!myConfSetts.exists()) File(myConfsRoot).mkdirs()
    Files.move(
        Path("platforms/discord/src/main/resources/$fileName"),
        myConfSetts
    )
}
