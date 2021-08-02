package net.moxie.platform.discord.database.tables.discord

import org.jetbrains.exposed.dao.id.LongIdTable

object GuildTable : LongIdTable() {
    val prefix = text("prefix").default("mx!")
    val didYouMean = bool("didYouMean").default(false)
}
