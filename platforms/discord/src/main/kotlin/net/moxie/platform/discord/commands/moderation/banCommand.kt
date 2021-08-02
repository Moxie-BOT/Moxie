/*@file:JvmName("BanCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.moderation

import dev.kord.common.annotation.KordPreview
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.argument.text.StringArgument
import dev.kord.x.commands.kord.argument.UserArgument
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke

@OptIn(KordPreview::class)
@ModuleName("moderation")
fun banCommand() = command("ban") {
    alias("banir", "b")
    invoke(UserArgument, StringArgument.withDefault("Nenhum motivo definido")) { user, reason ->
        val msg = respond("Você quer mesmo banir ${user.mention}?")
    }
}*/
