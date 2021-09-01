package net.moxie.database.dao

import net.moxie.database.tables.UserTable
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UserDao(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<UserDao>(UserTable)

    val userId = this.id.value
    var gender by UserTable.gender
    val language by UserTable.language
    val wishes by UserTable.wishes
    val lastDailyDateTime by UserTable.lastDailyDateTime
}
