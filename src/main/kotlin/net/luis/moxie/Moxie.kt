package net.luis.moxie

import dev.kord.cache.map.MapLikeCollection
import dev.kord.cache.map.internal.MapEntryCache
import dev.kord.cache.map.lruLinkedHashMap
import dev.kord.core.Kord
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.PrivilegedIntent
import net.luis.moxie.settings.MoxieSettings

class Moxie(val settings: MoxieSettings, val kord: Kord)

@OptIn(PrivilegedIntent::class)
suspend inline fun moxie(settings: MoxieSettings): Moxie {
    val kord = Kord(settings.client.token) {
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
    return Moxie(settings, kord)
}
