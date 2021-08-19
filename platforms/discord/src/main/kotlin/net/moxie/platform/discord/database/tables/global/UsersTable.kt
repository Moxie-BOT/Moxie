package net.moxie.platform.discord.database.tables.global

import org.jetbrains.exposed.dao.id.LongIdTable

object UsersTable : LongIdTable() {
    val tag = text("userTag")
    val gender = integer("gender").default(0)
}
