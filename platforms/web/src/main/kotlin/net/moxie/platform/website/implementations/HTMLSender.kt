package net.moxie.platform.website.implementations

import io.ktor.routing.*

abstract class HTMLSender(route: Routing) : HTMLCompose() {
    init {
        route.postRoute()
    }

    abstract fun Route.postRoute()
}
