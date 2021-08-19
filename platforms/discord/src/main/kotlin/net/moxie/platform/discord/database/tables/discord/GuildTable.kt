package net.moxie.platform.discord.database.tables.discord

import org.jetbrains.exposed.dao.id.LongIdTable

object GuildTable : LongIdTable() {
    val language = text("language").default("pt-BR")
}
