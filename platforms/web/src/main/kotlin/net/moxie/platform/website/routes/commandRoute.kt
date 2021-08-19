package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.body
import kotlinx.html.head
import kotlinx.html.link
import net.moxie.platform.website.implementations.moxieHead

fun Route.commandsRoute() {
    get("/commands") {
        call.respondHtml {
            head {
                moxieHead()
                link("/static/command.css", "stylesheet", "text/css")
            }
            body {
                TODO()
            }
        }
    }
}
