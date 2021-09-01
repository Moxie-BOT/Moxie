@file:Suppress("PropertyName")

val exposedVersion: String by project
val hikaricpVersion: String by project
val postgreJDBCVersion: String by project
val forstVersion: String by project

kotlin {
    val jvmMain by sourceSets.getting {
        dependencies {
            api("org.jetbrains.exposed:exposed-core:$exposedVersion")
            api("org.jetbrains.exposed:exposed-dao:$exposedVersion")
            api("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
            api("org.jetbrains.exposed:exposed-java-time:$exposedVersion")
            api("com.zaxxer:HikariCP:$hikaricpVersion")
            api("org.postgresql:postgresql:$postgreJDBCVersion")
            api("pw.forst:exposed-upsert:$forstVersion")
            api(project(":common"))
        }
    }
}
