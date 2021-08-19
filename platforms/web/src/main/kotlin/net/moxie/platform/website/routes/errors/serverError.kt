package net.moxie.platform.website.routes.errors

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.util.pipeline.*
import kotlinx.html.head
import net.moxie.platform.website.implementations.moxieHead

suspend fun PipelineContext<*, ApplicationCall>.serverError(cause: Throwable) {
    call.respondHtml {
        head {
            moxieHead()
        }
    }
    throw cause
}
