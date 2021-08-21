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
                        i("fa fa-home") {
                            attributes["aria-hidden"] = "true"
                            +" Início"
                        }
                    }
                    a("/commands", classes = "nav-link") {
                        i("fa fa-terminal") {
                            attributes["aria-hidden"] = "true"
                            +" Comandos"
                        }
                    }
                }
                button(type = ButtonType.button, classes = "fa fa-bars") {
                    id = "button-icon"
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