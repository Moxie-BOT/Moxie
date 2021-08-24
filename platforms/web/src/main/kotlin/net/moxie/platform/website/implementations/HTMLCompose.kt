package net.moxie.platform.website.implementations

import kotlinx.html.*

abstract class HTMLCompose {
    fun HTML.composeDocument(customStyleSheet: String? = null) {
        head {
            moxieHead(customStyleSheet = customStyleSheet)
        }
        body {
            nav("moxie-navbar") {
                div("nav-links") {
                    a("/", classes = "nav-link") {
                        i("fas fa-home") {
                            attributes["aria-hidden"] = "true"
                            +" Início"
                        }
                    }
                    a("/commands", classes = "nav-link") {
                        i("fas fa-terminal") {
                            attributes["aria-hidden"] = "true"
                            +" Comandos"
                        }
                    }
                }
                a("/login", classes = "nav-link-login") {
                    i("fas fa-sign-in") {
                        attributes["aria-hidden"] = "true"
                        +" Login"
                    }
                }
                button(type = ButtonType.button) {
                    id = "button-navbar"
                    i("fas fa-bars")
                }
            }
            div {
                id = "special-content"
                specialContent()
            }
        }
    }

    abstract fun DIV.specialContent()
}