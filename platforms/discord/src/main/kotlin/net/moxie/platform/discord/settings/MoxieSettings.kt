package net.moxie.platform.discord.settings

import com.github.benmanes.caffeine.cache.Caffeine
import com.typesafe.config.ConfigFactory
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.Serializable
import kotlinx.serialization.hocon.Hocon
import kotlinx.serialization.hocon.decodeFromConfig
import java.io.File
import java.util.concurrent.ConcurrentMap
import java.util.concurrent.TimeUnit

// Properties of configuration files
@Serializable
data class DiscordSettings(
    val client: ClientSettings,
)

@Serializable
data class MoxieSettings(
    val database: MoxieDatabase,
    val APIs: MoxieApis
)

@Serializable
data class ClientSettings(
    val token: String
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

@Serializable
data class MoxieApis(
    val twitch: TwitcAPI
)

@Serializable
data class TwitcAPI(
    val clientID: String,
    val secret: String,
    val token: String
)

@OptIn(ExperimentalSerializationApi::class)
inline fun <reified T> getSettings(fileRoot: String): T =
    Hocon.decodeFromConfig(ConfigFactory.parseFile(File(fileRoot)))
