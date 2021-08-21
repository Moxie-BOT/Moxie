package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.DIV
import kotlinx.html.div
import kotlinx.html.style
import net.moxie.platform.website.implementations.HTMLSender

class HomeRoute(route: Routing) : HTMLSender(route) {
    override fun Route.postRoute() {
        get("/") {
            call.respondHtml {
                composeDocument("/static/home.css")
            }
        }
    }

    override fun DIV.specialContent() {
        div("background-container") {
            div {
                style = "height: 60vh;background: #766DF4;background-size: 100%;"
            }
            div {
                style = "height: 40vh;background: #36393F;background-size: 100%;"
            }
        }
    }
}
