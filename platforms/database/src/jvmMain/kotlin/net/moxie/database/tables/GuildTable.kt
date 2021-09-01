package net.moxie.database.tables

import org.jetbrains.exposed.dao.id.LongIdTable

object GuildTable : LongIdTable() {
    val language = integer("language").default(0)
}
