package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.DIV
import net.moxie.platform.website.implementations.HTMLSender

class SupportRoute(route: Routing) : HTMLSender(route) {
    override fun Route.postRoute() {
        get("/support") {
            call.respondHtml {
                composeDocument("/static/support.css")
            }
        }
    }

    override fun DIV.specialContent() {}
}
