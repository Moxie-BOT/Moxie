package net.moxie.platform.discord.settings

import com.typesafe.config.ConfigFactory
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.hocon.Hocon
import kotlinx.serialization.hocon.decodeFromConfig
import kotlinx.serialization.Serializable
import java.io.File

@Serializable
data class DiscordSettings(
    val client: ClientSettings,
)

@Serializable
data class MoxieSettings(
    val database: MoxieDatabase,
)

@Serializable
data class ClientSettings(
    val token: String,
    val prefix: String,
)

@Serializable
data class MoxieDatabase(
    val host: String,
    val port: String = "5432",
    val name: String,
    val user: String,
    val password: String,
    val maximumPoolSize: Int,
    val minimumIdle: Int,
)

@OptIn(ExperimentalSerializationApi::class)
inline fun <reified T> getSettings(fileRoot: String): T =
    Hocon.decodeFromConfig(ConfigFactory.parseFile(File(fileRoot)))
