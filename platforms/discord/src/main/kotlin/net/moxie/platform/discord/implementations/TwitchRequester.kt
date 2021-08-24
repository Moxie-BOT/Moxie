package net.moxie.platform.discord.implementations

import com.github.benmanes.caffeine.cache.Caffeine
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import net.moxie.platform.discord.settings.MoxieSettings
import net.moxie.platform.discord.settings.getSettings
import java.util.concurrent.TimeUnit

class TwitchRequester(val user: String) {
    private val settings = getSettings<MoxieSettings>("configuration/common/moxie.conf")
    val streamerCache = Caffeine.newBuilder().expireAfterWrite(30, TimeUnit.MINUTES).maximumSize(1000).build<String, StreamerData>().asMap()

    suspend fun getUserByName(): HttpResponse {
        return HttpClient().get("https://api.twitch.tv/helix/users?login=$user") {
            headers {
                append(HttpHeaders.Authorization, settings.APIs.twitch.token)
                append("Client-ID", settings.APIs.twitch.clientID)
            }
        }
    }

    suspend fun getUserByID(): HttpResponse {
        return HttpClient().get("https://api.twitch.tv/helix/users?id=$user") {
            headers {
                append(HttpHeaders.Authorization, settings.APIs.twitch.token)
                append("Client-ID", settings.APIs.twitch.clientID)
            }
        }
    }

    suspend fun getUser() {
        println(getUserByName())
    }
    data class StreamerData(
        val login: String,
        val id: Long
    )
}