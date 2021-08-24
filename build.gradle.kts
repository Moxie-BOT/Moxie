@file:Suppress("PropertyName")

plugins {
    kotlin("plugin.serialization") version "1.5.0"
    kotlin("jvm") version "1.5.21"
}

val coroutines_version: String by project
val datetime_version: String by project
val serialization_version: String by project
val slf4j_version: String by project
val caffeine_version: String by project

allprojects {
    apply(plugin = "org.jetbrains.kotlin.jvm")
    apply(plugin = "org.jetbrains.kotlin.plugin.serialization")

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("org.jetbrains.kotlinx:kotlinx-serialization-hocon:$serialization_version")
        implementation("org.slf4j:slf4j-simple:$slf4j_version")
        implementation("com.github.ben-manes.caffeine:caffeine:$caffeine_version")
    }

    tasks.compileKotlin {
        kotlinOptions {
            jvmTarget = "1.8"
            freeCompilerArgs += "-Xopt-in=kotlin.RequiresOptIn"
        }
    }
}
