package net.moxie.platform.discord.database.tables

import net.moxie.platform.discord.database.tables.discord.GuildTable
import net.moxie.platform.discord.database.tables.global.UsersTable
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun createSchemas() = transaction {
    SchemaUtils.createMissingTablesAndColumns(
        GuildTable,
        UsersTable
    )
}
