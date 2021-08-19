package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.*
import kotlinx.css.properties.TextDecoration

fun Route.homeStyleRoute() {
    get("/static/home.css") {
        call.respondCss {
            TODO()
        }
    }
}
