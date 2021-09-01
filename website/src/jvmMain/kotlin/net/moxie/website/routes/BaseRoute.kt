package net.moxie.website.routes

import io.ktor.routing.*


abstract class BaseRoute {
    abstract suspend fun Routing.moxieRoute()
}
