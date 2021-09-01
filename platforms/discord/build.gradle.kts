@file:Suppress("PropertyName")

val kordexVersion: String by project

kotlin {
    val jvmMain by sourceSets.getting {
        dependencies {
            api("com.kotlindiscord.kord.extensions:kord-extensions:$kordexVersion")
            api("com.kotlindiscord.kord.extensions:extra-common:$kordexVersion")
            api("com.google.code.gson:gson:2.8.8")
            api(project(":platforms:database"))
            api(project(":website"))
            api(project(":common"))
        }
    }
}
