plugins {
    kotlin("jvm") version "1.5.21"
    kotlin("plugin.serialization") version "1.5.21"
}

repositories {
    mavenCentral()
}

val kord_version: String by project
val serialization_version: String by project
val exposed_version: String by project
val hikaricp_version: String by project
val postgre_jdbc_version: String by project

dependencies {
    implementation("org.slf4j:slf4j-simple:1.7.30")
    implementation("dev.kord:kord-core:$kord_version")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-hocon:$serialization_version")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-java-time:$exposed_version")
    implementation("com.zaxxer:HikariCP:$hikaricp_version")
    implementation("org.postgresql:postgresql:$postgre_jdbc_version")
    implementation("pw.forst:exposed-upsert:1.1.0")
}

tasks.compileKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
        freeCompilerArgs += "-Xopt-in=kotlin.RequiresOptIn"
    }
}
