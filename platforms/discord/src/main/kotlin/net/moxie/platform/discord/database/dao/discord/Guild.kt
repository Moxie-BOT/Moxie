package net.moxie.platform.discord.database.dao.discord

import net.moxie.platform.discord.database.tables.discord.GuildTable
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class Guild(id: EntityID<Long>) : LongEntity(id) {
    companion object : LongEntityClass<Guild>(GuildTable)

    val guildId = this.id.value
    var prefix by GuildTable.prefix
    val didYouMean by GuildTable.didYouMean
}
