package net.moxie.platform.discord.database.dao.global

import net.moxie.platform.discord.database.tables.discord.GuildTable
import net.moxie.platform.discord.database.tables.global.UsersTable
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Users(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<Users>(GuildTable)

    val userId = this.id.value
    val tag by UsersTable.tag
    val gender by UsersTable.gender
}
