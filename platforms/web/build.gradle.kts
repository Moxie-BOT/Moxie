plugins {
    application
}

application {
    mainClass.set("io.ktor.server.netty.EngineMain")
}

val ktor_version: String by project

dependencies {
    api("io.ktor:ktor-server-netty:$ktor_version")
    api("io.ktor:ktor-html-builder:$ktor_version")
    api(project(":platforms:discord"))
}
