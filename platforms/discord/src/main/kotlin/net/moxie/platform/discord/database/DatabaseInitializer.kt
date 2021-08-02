package net.moxie.platform.discord.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import net.moxie.platform.discord.database.tables.createSchemas
import net.moxie.platform.discord.settings.MoxieSettings
import net.moxie.platform.discord.settings.getSettings
import org.jetbrains.exposed.sql.Database

fun databaseInitializer() {
    Database.connect(HikariDataSource(dataConfig))
    createSchemas()
}

val dataConfig: HikariConfig
        by lazy {
            val configs = getSettings<MoxieSettings>("configuration/common/moxie.conf")
            val config = HikariConfig()
            val host: String = configs.database.host
            val port: String = configs.database.port
            val name: String = configs.database.name

            Class.forName("org.postgresql.Driver")
            config.apply {
                jdbcUrl = "jdbc:postgresql://$host:$port/$name"
                username = configs.database.user
                password = configs.database.password
                maximumPoolSize = configs.database.maximumPoolSize
                minimumIdle = configs.database.minimumIdle
                addDataSourceProperty("reWriteBatchedInserts", "true")
                isAutoCommit = false
                leakDetectionThreshold = 30 * 1000
            }
            return@lazy config
        }
