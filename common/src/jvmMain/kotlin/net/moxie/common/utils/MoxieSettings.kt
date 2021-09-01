package net.moxie.common.utils

import com.typesafe.config.ConfigFactory
import io.github.config4k.extract
import kotlinx.serialization.Serializable
import java.io.File

data class MoxieSettings(
    val discord: DiscordConf,
    val database: DatabaseConf,
    val website: WebsiteConf,
    val APIs: ApisConf
) {
    companion object {
        val instance by lazy {
            ConfigFactory.parseString(
                File("moxie.instance.conf").readText()
            ).extract<MoxieSettings>()
        }
    }
}

@Serializable
data class DiscordConf(
    val token: String,
    val clientID: Long
)

@Serializable
data class DatabaseConf(
    val host: String,
    val port: String = "5432",
    val name: String,
    val user: String,
    val password: String,
    val maximumPoolSize: Int,
    val minimumIdle: Int
)

@Serializable
data class WebsiteConf(
    val enabled: Boolean
)

@Serializable
data class ApisConf(
    val twitch: TwitchApi
)

@Serializable
data class TwitchApi(
    val clientID: String,
    val clientSecret: String,
    var clientToken: String
)
