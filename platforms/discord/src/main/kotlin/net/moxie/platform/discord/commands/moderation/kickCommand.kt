/*@file:JvmName("KickCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.moderation

import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.extension.withDefault
import dev.kord.x.commands.argument.text.StringArgument
import dev.kord.x.commands.kord.argument.MemberArgument
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke

@ModuleName("moderation")
fun kickCommand() = command("kick") {
    alias("expulsar")
    invoke(MemberArgument, StringArgument.withDefault("Nenhum motivo definido")) { member, reason ->
        TODO()
    }
}*/
