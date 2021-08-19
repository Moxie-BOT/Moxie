package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.*
import net.moxie.platform.website.implementations.moxieHead

fun Route.homeRoute() {
    get("/") {
        call.respondHtml {
            head {
                moxieHead()
                link("/static/home.css", "stylesheet", "text/css")
            }
            body {
                TODO()
            }
        }
    }
}
