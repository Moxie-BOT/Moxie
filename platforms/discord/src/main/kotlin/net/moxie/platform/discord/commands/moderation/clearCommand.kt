/*@file:JvmName("ClearCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.moderation

import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.argument.primitive.IntArgument
import dev.kord.x.commands.argument.text.StringArgument
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke

@ModuleName("moderation")
fun clearCommand() = command("clear") {
    alias("limpar", "purge")
    invoke(IntArgument, StringArgument) { amount, filter ->
        TODO()
    }
}*/
