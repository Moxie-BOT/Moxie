package net.moxie.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import net.moxie.common.utils.MoxieSettings
import net.moxie.database.tables.GuildTable
import net.moxie.database.tables.UserTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseLauncher {
    fun starter() {
        val dataConfig: HikariConfig
                by lazy {
                    val config = HikariConfig()
                    val configs = MoxieSettings.instance.database
                    val host: String = configs.host
                    val port: String = configs.port
                    val name: String = configs.name

                    Class.forName("org.postgresql.Driver")

                    config.apply {
                        jdbcUrl = "jdbc:postgresql://$host:$port/$name"
                        username = configs.user
                        password = configs.password
                        maximumPoolSize = configs.maximumPoolSize
                        minimumIdle = configs.minimumIdle
                        addDataSourceProperty("reWriteBatchedInserts", "true")
                        isAutoCommit = false
                        leakDetectionThreshold = 30000
                    }
                    return@lazy config
                }
        Database.connect(HikariDataSource(dataConfig))

        transaction {
            SchemaUtils.createMissingTablesAndColumns(
                UserTable,
                GuildTable
            )
        }
    }
}
