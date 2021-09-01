package net.moxie.platform.discord

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import net.moxie.common.utils.MoxieSettings
import net.moxie.database.DatabaseLauncher
import net.moxie.website.WebsiteLauncher
import java.io.File
import java.security.Security
import kotlin.system.exitProcess

suspend fun main() {
    if (!File("moxie.instance.conf").exists()) {
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
        println("So that I can start my work, I will need you to configure some files, nothing too difficult, just go to moxie.instance.conf")
        println("After that, open each file and see how important each variable is so you can change its value")

        exitProcess(1)
    }

    // Resolve NativePRNGNonBlocking is not found, fallback to SHA1PRNG ktor warn
    System.setProperty("io.ktor.random.secure.random.provider", "DRBG")
    Security.setProperty("securerandom.drbg.config", "HMAC_DRBG,SHA-512,256,pr_and_reseed")

    // Start the other modules on DefaultDispatcher
    withContext(Dispatchers.IO) {
        DatabaseLauncher.starter()
        if (MoxieSettings.instance.website.enabled) WebsiteLauncher.starter()
    }

    // the magic starts here
    DiscordLauncher.starter()
}
