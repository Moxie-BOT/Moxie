package net.moxie.platform.website.routes

import io.ktor.application.*
import io.ktor.html.*
import io.ktor.http.content.*
import io.ktor.routing.*
import kotlinx.html.*

fun Route.homeRoute() {
    get("/") {
        call.respondHtml {
            lang = "pt-br"
            charset("UTF-8")
            head {
                generateMeta()
                title {
                    +"Moxie • Simples e funcional!"
                }
                link("/static-resources/Moxie.png", "icon", "image/x-icon") { sizes = "128x128" }
            }
            body {
                h1 {
                    +"something big to come"
                }
            }
        }
    }

    static("static-resources") {
        resources("assets")
    }
}

fun HEAD.generateMeta() {
    meta("viewport", "width=device-width, initial-scale=1.0")
    meta("theme-color", "#be4bef")
    meta("creator", "Luis")
    meta(content = "website") { attributes["property"] = "og:type" }
    meta(
        "description",
        "Saudações! Eu me chamo Moxie, mais uma bot dentre várias outras com algumas funcionalidades incríveis, quem sabe não tenha nada de especial e diferente esperando por você e pelo seu servidor!"
    )
    meta(content = "Saudações! Eu me chamo Moxie, mais uma bot dentre várias outras com algumas funcionalidades incríveis, quem sabe não tenha nada de especial e diferente esperando por você e pelo seu servidor!") {
        attributes["property"] = "og:description"
    }
    meta("keywords", "moxie discordbot discord bot")
    meta(content = "moxie discordbot discord bot") { attributes["property"] = "og:keywords" }
    meta(content = "<url>") { attributes["property"] = "og:url" }
    meta(content = "Moxie • Simples e funcional!") { attributes["property"] = "og:site_name" }
    meta(content = "/static-resources/Moxie.png") { attributes["property"] = "og:image" }
}
