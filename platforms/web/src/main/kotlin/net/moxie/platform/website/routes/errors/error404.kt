package net.moxie.platform.website.routes.errors

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.util.pipeline.*
import kotlinx.html.head

suspend fun PipelineContext<*, ApplicationCall>.error404() {
    call.respondHtml {
        head {
        }
    }
}