plugins {
    application
}

application {
    mainClass.set("io.ktor.server.netty.EngineMain")
}

repositories {
    maven("https://mvnrepository.com/artifact/org.jetbrains.kotlin/kotlin-stdlib-js")
    maven("https://maven.kotlindiscord.com/repository/maven-public/")
}

val ktor_version: String by project
val kotlinCss_version: String by project

dependencies {
    api("org.jetbrains.kotlin-wrappers:kotlin-css:$kotlinCss_version")
    api("io.ktor:ktor-server-netty:$ktor_version")
    api("io.ktor:ktor-html-builder:$ktor_version")
    api(project(":platforms:discord"))
}

/*val fatJar = task("fatJar", type = org.gradle.jvm.tasks.Jar::class) {
    archiveClassifier.set("fat")
    manifest {
        attributes["Implementation-Title"] = "Moxie Web"
        attributes["Implementation-Version"] = archiveVersion
        attributes["Main-Class"] = "net.moxie.platform.website.WebsiteLauncherKt"
    }
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    from(configurations.runtimeClasspath.get().map { if (it.isDirectory) it else zipTree(it) })
    with(tasks.jar.get() as CopySpec)
}

tasks {
    "build" {
        dependsOn(fatJar)
    }
}*/
