package net.carpediem.utils

import com.github.benmanes.caffeine.cache.Caffeine
import com.google.gson.Gson
import com.google.gson.JsonParser
import com.google.gson.annotations.SerializedName
import io.ktor.client.*
import io.ktor.client.features.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import mu.KotlinLogging
import net.moxie.common.utils.MoxieSettings
import java.util.*
import java.util.concurrent.ConcurrentMap
import java.util.concurrent.TimeUnit

val configs = MoxieSettings.instance.APIs.twitch

class TwitchRequester(private val user: String) {
    private val client = HttpClient()
    private val log = KotlinLogging.logger { }

    val streamerCachedName: ConcurrentMap<String, StreamerProfile> =
        Caffeine.newBuilder().expireAfterWrite(15, TimeUnit.MINUTES).maximumSize(100)
            .build<String, StreamerProfile>()
            .asMap()
    val streamerCachedId: ConcurrentMap<Long, StreamerProfile> =
        Caffeine.newBuilder().expireAfterWrite(15, TimeUnit.MINUTES).maximumSize(100).build<Long, StreamerProfile>()
            .asMap()

    private suspend fun checkCorrectResponse(code: HttpStatusCode) {
        when (code) {
            HttpStatusCode.Unauthorized -> run {
                val data =
                    client.get<HttpResponse>("https://id.twitch.tv/oauth2/token?client_id=${configs.clientID}&client_secret=${configs.clientSecret}&grant_type=client_credentials") {
                        headers {
                            method = HttpMethod.Post
                        }
                    }
                val dataParsed = JsonParser.parseString(data.readText()).asJsonObject
                log.info { "Twitch token refresh! New token: ${dataParsed["access_token"]}" }

                MoxieSettings.instance.APIs.twitch.clientToken = dataParsed["access_token"].asString
                getStreamerCaching()
            }
            else -> throw Error()
        }
    }

    suspend fun getUserById(): HttpResponse? = try {
        client.get("https://api.twitch.tv/helix/users?id=$user") {
            header("Client-ID", configs.clientID)
            header(HttpHeaders.Authorization, "Bearer ${configs.clientToken}")
        }
    } catch (e: ClientRequestException) {
        checkCorrectResponse(e.response.status)
        null
    }

    suspend fun getUserByName(): HttpResponse? = try {
        client.get("https://api.twitch.tv/helix/users?login=$user") {
            header("Client-ID", configs.clientID)
            header(HttpHeaders.Authorization, "Bearer ${configs.clientToken}")
        }
    } catch (e: ClientRequestException) {
        checkCorrectResponse(e.response.status)
        null
    }

    suspend fun getStreamerCaching(): StreamerProfile? {
        val userID = user.toLongOrNull()

        if (userID != null && streamerCachedId[userID] != null) return streamerCachedId[userID]
        if (streamerCachedName[user] != null) return streamerCachedName[user]

        val streamer: HttpResponse? = if (userID != null) getUserById()
        else getUserByName()
        if (streamer == null) return null

        val data = JsonParser.parseString(streamer.readText()).asJsonObject["data"].asJsonArray

        var streamerFinal = StreamerProfile(null, 0L, "", null, null, 0L, null)
        data.forEach {
            streamerFinal = Gson().fromJson(it, StreamerProfile::class.java)

            log.info("Caching streamer ${streamerFinal.login}")

            streamerCachedName[streamerFinal.login] = streamerFinal
            streamerCachedId[streamerFinal.id] = streamerFinal
        }

        return streamerCachedId[streamerFinal.id]
    }

    data class StreamerProfile(
        @SerializedName("display_name")
        val displayName: String?,
        @SerializedName("id")
        val id: Long,
        @SerializedName("login")
        val login: String,
        @SerializedName("description")
        val description: String?,
        @SerializedName("profile_image_url")
        val image: String?,
        @SerializedName("view_count")
        val viewCount: Long,
        @SerializedName("created_at")
        val createdAt: String?,
    )
}
