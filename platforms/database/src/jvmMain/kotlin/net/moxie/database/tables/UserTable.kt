package net.moxie.database.tables

import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.`java-time`.datetime

object UserTable : LongIdTable() {
    val language = integer("language").default(0)
    val gender = integer("gender").default(0)
    val wishes = long("wishes").default(0L)
    val lastDailyDateTime = datetime("last_daily_datetime").nullable()
}
