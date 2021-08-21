package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.DIV
import net.moxie.platform.website.implementations.HTMLSender

class CommandRoute(route: Routing) : HTMLSender(route) {
    override fun Route.postRoute() {
        get("/commands") {
            call.respondHtml {
                composeDocument("/static/command.css")
            }
        }
    }

    override fun DIV.specialContent() {}
}
