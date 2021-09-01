package net.moxie.platform.discord.implementations

import com.kotlindiscord.kord.extensions.builders.ExtensibleBotBuilder
import net.moxie.common.utils.Language
import net.moxie.database.dao.GuildDao
import net.moxie.database.dao.UserDao
import org.jetbrains.exposed.sql.transactions.transaction

fun ExtensibleBotBuilder.I18nBuilder.moxieI18nBuilder() {
    defaultLocale = Language.PORTGUESE.locale

    localeResolver { guild, _, user ->
        if (guild == null || user == null) return@localeResolver defaultLocale

        val userQuery = transaction { UserDao.findById(user.id.value) }
        val guildQuery = transaction { GuildDao.findById(guild.id.value) }

        // If the user isn't found on the table, it means we can use my native language
        if (userQuery != null) return@localeResolver when (userQuery.language) {
            0 -> defaultLocale
            else -> defaultLocale
        } else {
            // The same goes for the server
            if (guildQuery == null) defaultLocale
            else when (guildQuery.language) {
                0 -> defaultLocale
                else -> defaultLocale
            }
        }
    }
}
