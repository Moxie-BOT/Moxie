package net.moxie.website

import io.ktor.server.engine.*
import io.ktor.server.netty.*

object WebsiteLauncher {
    fun starter() {
        embeddedServer(
            Netty,
            8080,
            watchPaths = listOf("website"),
        ) {
        }.start(false)
    }
}
