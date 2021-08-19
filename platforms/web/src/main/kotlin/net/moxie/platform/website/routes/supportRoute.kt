package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.routing.*
import kotlinx.html.body
import kotlinx.html.head
import net.moxie.platform.website.implementations.moxieHead

fun Route.supportRoute() {
    get("/support") {
        call.respondHtml {
            head {
                moxieHead()
            }
            body {
                TODO()
            }
        }
    }
}
