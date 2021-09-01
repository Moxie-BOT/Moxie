package net.moxie.database.dao

import net.moxie.database.tables.GuildTable
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class GuildDao(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<GuildDao>(GuildTable)

    val guildId = this.id.value
    val language by GuildTable.language
}
