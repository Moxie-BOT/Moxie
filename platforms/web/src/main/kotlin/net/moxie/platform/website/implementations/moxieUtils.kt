package net.moxie.platform.website.implementations

import kotlinx.html.*

fun HEAD.moxieHead() {
    title("Moxie")
    meta(charset = "UTF-8")
    meta("viewport", "width=device-width, initial-scale=1.0")
    meta("creator", "Luis")
    meta(content = "Moxie") {
        attributes["property"] = "og:site_name"
    }
    meta(content = "website") {
        attributes["property"] = "og:type"
    }
    meta(
        "description",
        ""
    )
    meta(content = "") {
        attributes["property"] = "og:description"
    }
    meta("keywords", "moxie discordbot discord bot")
    meta(content = "moxie discordbot discord bot") {
        attributes["property"] = "og:keywords"
    }
    meta(content = "/assets/moxie.png") {
        attributes["property"] = "og:image"
    }

    link("/assets/sparkles.ico", "icon", "image/x-icon") {
        sizes = "128x128"
    }
    link("https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css", "stylesheet")
}
