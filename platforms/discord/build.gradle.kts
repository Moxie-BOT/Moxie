@file:Suppress("PropertyName")

plugins {
    kotlin("kapt")
}

val kordx_commands_version: String by project
val kordx_emoji_version: String by project
val exposed_version: String by project
val hikaricp_version: String by project
val postgre_jdbc_version: String by project
val forst_version: String by project
val topgg_version: String by project

dependencies {
    api("dev.kord.x:commands-runtime-kord:$kordx_commands_version")
    api("dev.kord.x:emoji:$kordx_emoji_version")
    api("org.jetbrains.exposed:exposed-core:$exposed_version")
    api("org.jetbrains.exposed:exposed-dao:$exposed_version")
    api("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    api("org.jetbrains.exposed:exposed-java-time:$exposed_version")
    api("com.zaxxer:HikariCP:$hikaricp_version")
    api("org.postgresql:postgresql:$postgre_jdbc_version")
    api("pw.forst:exposed-upsert:$forst_version")
    configurations["kapt"].dependencies.add(project.dependencies.create(
        "dev.kord.x:commands-processor:$kordx_commands_version"
    ))
}
