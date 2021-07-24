package discord.essentials.net.luis.moxie

import dev.kord.cache.map.MapLikeCollection
import dev.kord.cache.map.internal.MapEntryCache
import dev.kord.cache.map.lruLinkedHashMap
import dev.kord.core.Kord
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import discord.essentials.net.luis.moxie.utils.DiscordListener
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import discord.special.utilities.HoconUtils

@OptIn(PrivilegedIntent::class)
suspend fun initializeClient() = coroutineScope {
    launch {
        val me = Kord(HoconUtils.TOKEN) {
            intents = Intents(Intent.GuildMembers, Intent.GuildMessages)
            cache {
                users { cache, description ->
                    MapEntryCache(cache, description, MapLikeCollection.concurrentHashMap())
                }

                messages { cache, description ->
                    MapEntryCache(cache, description, MapLikeCollection.lruLinkedHashMap(maxSize = 100))
                }

                members { cache, description ->
                    MapEntryCache(cache, description, MapLikeCollection.none())
                }
            }
        }
        val listener = DiscordListener()

        with(me) {
            addEvent(listener::onReady)
            addEvent(listener::onMessageCreated)
            login()
        }
    }
}

inline fun <reified T : dev.kord.core.event.Event> Kord.addEvent(crossinline method: suspend (T) -> Unit) =
    this@addEvent.on<T> {
        method(this)
    }