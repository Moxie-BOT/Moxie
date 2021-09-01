package net.moxie.website.routes

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

class HomeRoute : BaseRoute() {
    override suspend fun Routing.moxieRoute() {
        get("/") {
            call.respondText("hey")
        }
    }
}
