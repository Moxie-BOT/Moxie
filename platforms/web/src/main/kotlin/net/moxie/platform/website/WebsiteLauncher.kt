package net.moxie.platform.website

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.routing.*
import io.ktor.server.netty.*
import net.moxie.platform.website.css.commandStyleRoute
import net.moxie.platform.website.css.homeStyleRoute
import net.moxie.platform.website.css.navbarAndFooterStyleRoute
import net.moxie.platform.website.routes.*
import net.moxie.platform.website.routes.errors.error404
import net.moxie.platform.website.routes.errors.serverError

fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    install(StatusPages) {
        status(HttpStatusCode.NotFound) {
            error404()
        }
        exception<Throwable> { cause ->
            serverError(cause)
        }
    }
    routing {
        static("/assets") {
            resources("assets")
        }
        //     PAGES ROUTES     //
        HomeRoute(this)
        CommandRoute(this)
        SupportRoute(this)
        InviteRoute(this)
        LoginRoute(this)
        //     CSS ROUTES     //
        homeStyleRoute()
        navbarAndFooterStyleRoute()
        commandStyleRoute()
    }
}
