package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.*

fun Route.navbarAndFooterStyleRoute() {
    get("/static/navbarAndFooter.css") {
        call.respondCss {
            TODO()
        }
    }
}
