@file:JvmName("InviteCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.misc

import dev.kord.common.Color
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke

@ModuleName("misc")
fun inviteCommand() = command("invite") {
    alias("convite", "convidar")
    invoke {
        respondEmbed {
            color = Color(9456380)
            description = "Obrigada por querer me adicionar no seu servidor! Basta clicar **[aqui](https://discord.com/api/oauth2/authorize?client_id=623235960448221196&permissions=388166&scope=bot)**, além disso, se você precisar de suporte ou quiser dar sugestões de novas funcionalidades, conhecer novas pessoas e muito mais, ficaremos felizes em receber você no meu servidor! Clique [aqui](https://discord.gg/RkAtsxQbFH)."
        }
    }
}
