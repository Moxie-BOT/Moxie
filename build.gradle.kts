@file:Suppress("PropertyName")

// Packages Versions
val serializationVersion: String by project
val slf4jVersion: String by project
val caffeineVersion: String by project
val config4kVersion: String by project

plugins {
    kotlin("multiplatform") version "1.5.30"
    kotlin("plugin.serialization") version "1.5.30"
}

allprojects {
    apply(plugin = "org.jetbrains.kotlin.multiplatform")
    apply(plugin = "org.jetbrains.kotlin.plugin.serialization")

    repositories {
        maven(url = "https://maven.kotlindiscord.com/repository/maven-public/")
        mavenCentral()
    }

    kotlin {
        jvm {
            compilations.all {
                kotlinOptions {
                    jvmTarget = "16"
                    freeCompilerArgs += listOf("-Xjsr305=strict", "-Xopt-in=kotlin.RequiresOptIn")
                }
            }
        }

        val jvmMain by sourceSets.getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-hocon:$serializationVersion")
                implementation("org.slf4j:slf4j-simple:$slf4jVersion")
                implementation("com.github.ben-manes.caffeine:caffeine:$caffeineVersion")
                implementation("io.github.config4k:config4k:$config4kVersion")
            }
        }
    }
}
