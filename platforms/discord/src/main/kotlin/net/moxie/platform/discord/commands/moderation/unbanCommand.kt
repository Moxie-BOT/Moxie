/*@file:JvmName("UnbanCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.moderation

import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.argument.text.StringArgument
import dev.kord.x.commands.kord.argument.UserArgument
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke

@ModuleName("moderation")
fun unbanCommand() = command("unban") {
    alias("desbanir")
    invoke(UserArgument, StringArgument.withDefault("Nenhum motivo definido")) { user, reason ->
        TODO()
    }
}*/
