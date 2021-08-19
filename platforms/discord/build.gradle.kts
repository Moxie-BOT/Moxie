@file:Suppress("PropertyName")

import org.gradle.jvm.tasks.Jar

plugins {
    application
}

val kordx_emoji_version: String by project
val exposed_version: String by project
val hikaricp_version: String by project
val postgre_jdbc_version: String by project
val forst_version: String by project
val kordex_version: String by project

repositories {
    maven("https://maven.kotlindiscord.com/repository/maven-public/")
}

dependencies {
    api("dev.kord.x:emoji:$kordx_emoji_version")
    api("org.jetbrains.exposed:exposed-core:$exposed_version")
    api("org.jetbrains.exposed:exposed-dao:$exposed_version")
    api("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    api("org.jetbrains.exposed:exposed-java-time:$exposed_version")
    api("com.zaxxer:HikariCP:$hikaricp_version")
    api("org.postgresql:postgresql:$postgre_jdbc_version")
    api("pw.forst:exposed-upsert:$forst_version")
    api("com.kotlindiscord.kord.extensions:kord-extensions:$kordex_version")
}

application {
    mainClass.set("net.moxie.platform.discord.LauncherKt")
}

val fatJar = task("fatJar", type = Jar::class) {
    archiveClassifier.set("fat")
    manifest {
        attributes["Implementation-Title"] = "Moxie Discord"
        attributes["Implementation-Version"] = archiveVersion
        attributes["Main-Class"] = "net.moxie.platform.discord.LauncherKt"
    }
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    from(configurations.runtimeClasspath.get().map { if (it.isDirectory) it else zipTree(it) })
    with(tasks.jar.get() as CopySpec)
}

tasks {
    "build" {
        dependsOn(fatJar)
    }
}
