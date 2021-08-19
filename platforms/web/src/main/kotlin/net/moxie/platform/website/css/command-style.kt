package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.*

fun Route.commandStyleRoute() {
    get("/static/command.css") {
        call.respondCss {
            body {
                color = Color("#dfa5f7")
                fontSize = 1.em
                backgroundColor = Color("#0D1117")
                marginTop = 80.px
                alignItems = Align.center
            }
        }
    }
}
