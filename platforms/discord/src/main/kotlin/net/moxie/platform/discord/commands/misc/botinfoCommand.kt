@file:JvmName("BotInfoCommand")
@file:AutoWired

package net.moxie.platform.discord.commands.misc

import dev.kord.common.Color
import dev.kord.x.commands.annotation.AutoWired
import dev.kord.x.commands.annotation.ModuleName
import dev.kord.x.commands.kord.model.respondEmbed
import dev.kord.x.commands.kord.module.command
import dev.kord.x.commands.model.command.invoke
import dev.kord.x.emoji.Emojis
import net.moxie.platform.discord.utilities.MoxieEmojis

@ModuleName("misc")
fun botinfoCommand() = command("botinfo") {
    invoke {
        val moxie = kord.getSelf()
        respondEmbed {
            title = "${Emojis.wave} Saudações!"
            thumbnail { url = moxie.avatar.url }
            color = Color(9456380)
            description =
                "Eu me chamo Moxie, sou mais uma bot dentre várias outras com algumas funcionalidades incríveis , quem sabe não tenha nada de especial e diferente esperando por você e pelo seu servidor!\n\n**Algumas funcionalidades**\n┗ Comandos úteis -> Mostram pequenos detalhes sobre algo\n┗ Comandos de moderação -> Tornam mais automático certas ações de moderação no seu servidor\n\nCriada em **[Kotlin](https://kotlinlang.org/)** ${MoxieEmojis.KOTLIN_LOGO} com uma pitada de **[Kord](https://github.com/kordlib/kord#documentation)** ${MoxieEmojis.KORD_LOGO}! Você pode conferir meu código fonte clicando [aqui](https://github.com/Moxie-BOT/Moxie)"
            field("${Emojis.link} Meu convite", true) {
                "Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=623235960448221196&permissions=388166&scope=bot)"
            }
            field("${Emojis.womanTippingHand} Servidor de suporte", true) {
                "Clique [aqui](https://discord.gg/RkAtsxQbFH)"
            }
        }
    }
}
