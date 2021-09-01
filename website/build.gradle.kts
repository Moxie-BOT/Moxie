@file:Suppress("PropertyName")

val ktorVersion: String by project
val cssVersion: String by project

kotlin {
    val jvmMain by sourceSets.getting {
        dependencies {
            api("org.jetbrains.kotlin-wrappers:kotlin-css:$cssVersion")
            api("io.ktor:ktor-server-netty:$ktorVersion")
            api("io.ktor:ktor-client-core:$ktorVersion")
            api("io.ktor:ktor-html-builder:$ktorVersion")
            api("io.ktor:ktor-client-cio:$ktorVersion")
        }
    }
}
