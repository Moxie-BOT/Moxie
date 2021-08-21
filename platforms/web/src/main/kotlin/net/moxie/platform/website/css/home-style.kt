package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.body
import kotlinx.css.margin
import kotlinx.css.px

fun Route.homeStyleRoute() {
    get("/static/home.css") {
        call.respondCss {
        }
    }
}
