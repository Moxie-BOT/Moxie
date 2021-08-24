package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.html.DIV
import net.moxie.platform.website.implementations.HTMLSender

class LoginRoute(route: Routing) : HTMLSender(route) {
    override fun Route.postRoute() {
        get("/login") {
            call.respondRedirect(
                "https://discord.com/api/oauth2/authorize?client_id=623235960448221196&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=identify"
            )
        }
    }

    override fun DIV.specialContent() {}
}