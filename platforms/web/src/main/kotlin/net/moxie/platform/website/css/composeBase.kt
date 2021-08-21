package net.moxie.platform.website.css

import io.ktor.application.*
import io.ktor.routing.*
import kotlinx.css.*
import kotlinx.css.properties.TextDecoration

fun Route.navbarAndFooterStyleRoute() {
    get("/static/composeBase.css") {
        call.respondCss {
            body {
                margin(0.px)
            }
            rule(".moxie-navbar") {
                display = Display.flex
                alignItems = Align.center
                justifyContent = JustifyContent.spaceBetween
                margin(20.px)
                position = Position.fixed
            }
            rule(".nav-link") {
                fontSize = 23.px
                textDecoration = TextDecoration.none
                listStyleType = ListStyleType.none
                padding(LinearDimension("14px 16px"))
            }
            rule(".nav-link:hover") {
                backgroundColor = Color.transparent
            }
            rule("#button-icon") {
                display = Display.none
            }
            media("screen and (max-width: 991px)") {
                body {
                    marginTop = LinearDimension.initial
                    marginBottom = 80.px
                }
                rule(".nav-links a:not(:first-child)") {
                    display = Display.none
                }
                rule("#button-icon") {
                    display = Display.block
                }
            }
        }
    }
}
