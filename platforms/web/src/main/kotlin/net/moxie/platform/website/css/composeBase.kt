package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.*
import kotlinx.css.Float
import kotlinx.css.properties.TextDecoration

fun Route.navbarAndFooterStyleRoute() {
    get("/static/composeBase.css") {
        call.respondCss {
            body {
                height = LinearDimension("100%")
                margin(0.px)
            }
            rule(".moxie-navbar") {
                width = LinearDimension("97%")
                display = Display.flex
                alignItems = Align.center
                justifyContent = JustifyContent.spaceBetween
                margin(20.px)
                position = Position.fixed
            }
            rule(".nav-link, .nav-link-login") {
                color = Color.white
                fontSize = 23.px
                textDecoration = TextDecoration.none
                listStyleType = ListStyleType.none
                padding(LinearDimension("14px 16px"))
            }
            rule(".nav-link:hover, .nav-link-login") {
                backgroundColor = Color.transparent
            }
            rule("#button-navbar") {
                display = Display.none
            }
            media("screen and (max-width: 660px)") {
                body {
                    marginTop = LinearDimension.initial
                    marginBottom = 80.px
                }
                rule(".nav-links a:not(:first-child)") {
                    display = Display.none
                }
                rule(".moxie-navbar") {
                    width = LinearDimension("82%")
                }
                rule("#button-navbar") {
                    display = Display.block
                }
            }
        }
    }
}
