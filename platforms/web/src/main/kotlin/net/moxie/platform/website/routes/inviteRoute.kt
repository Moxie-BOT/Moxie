package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.inviteRoute() {
    get("/invite") {
        call.respondRedirect(
            "https://discord.com/oauth2/authorize?client_id=623235960448221196&permissions=8&scope=bot"
        )
    }
}
