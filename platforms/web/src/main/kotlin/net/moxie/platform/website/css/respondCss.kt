package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import kotlinx.css.CssBuilder

suspend inline fun ApplicationCall.respondCss(builder: CssBuilder.() -> Unit) {
    this.respondText(CssBuilder().apply(builder).toString(), ContentType.Text.CSS)
}
