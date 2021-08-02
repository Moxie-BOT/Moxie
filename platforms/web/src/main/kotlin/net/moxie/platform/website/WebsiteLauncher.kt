package net.moxie.platform.website


import io.ktor.application.*
import io.ktor.features.*
import io.ktor.routing.*
import io.ktor.server.netty.*
import net.moxie.platform.website.routes.homeRoute

fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    install(DefaultHeaders)
    install(CallLogging)
    routing {
        homeRoute()
    }
}
