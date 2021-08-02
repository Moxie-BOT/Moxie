package net.moxie.platform.discord.utilities

import dev.kord.common.entity.Permission
import dev.kord.common.entity.UserFlag
import dev.kord.common.entity.UserFlags

object ParsedCommons {
    private val mapPerms = hashMapOf(
        Permission.CreateInstantInvite to "Criar um convite instantâneo",
        Permission.KickMembers to "Expulsar membros",
        Permission.BanMembers to "Banir membros",
        Permission.Administrator to "Administrador",
        Permission.ManageChannels to "Gerenciar canais",
        Permission.ManageGuild to "Gerenciar o servidor",
        Permission.AddReactions to "Adicionar reações",
        Permission.ViewAuditLog to "Ver o log de auditoria",
        Permission.ViewChannel to "Ver o canal",
        Permission.SendMessages to "Enviar mensagens",
        Permission.SendTTSMessages to "Enviar mensagens em tts",
        Permission.ManageMessages to "Gerenciar mensagens",
        Permission.EmbedLinks to "Links em embed",
        Permission.AttachFiles to "Enviar arquivos",
        Permission.ReadMessageHistory to "Ver o histórico de mensagens",
        Permission.MentionEveryone to "Mencionar todos",
        Permission.UseExternalEmojis to "Usar emojis externos",
        Permission.ViewGuildInsights to "Ver estatísticas do servidor",
        Permission.Connect to "Conectar",
        Permission.Speak to "Falar",
        Permission.MuteMembers to "Silenciar membros",
        Permission.DeafenMembers to "Ensurdecer membros",
        Permission.MoveMembers to "Mover membros",
        Permission.UseVAD to "Usar detecção de voz",
        Permission.PrioritySpeaker to "Voz prioritária",
        Permission.ChangeNickname to "Mudar apelido",
        Permission.ManageNicknames to "Gerenciar apelidos",
        Permission.ManageRoles to "Gerenciar cargos",
        Permission.ManageWebhooks to "Gerenciar webhooks",
        Permission.ManageEmojis to "Gerenciar emojis",
        Permission.UseSlashCommands to "Usar comandos de /",
        Permission.RequestToSpeak to "Pedir para falar",
    ).toMutableMap()

    private val mapBadges = hashMapOf(
        UserFlag.None to "",
        UserFlag.DiscordEmployee to "<:teamdisc:851108217337151518>",
        UserFlag.DiscordPartner to "<:partner:851108691507150918>",
        UserFlag.HypeSquad to "<:hypeevent:851109159113588766>",
        UserFlag.BugHunterLevel1 to "<:bughunter:851109365149859860>",
        UserFlag.HouseBravery to "<:bravery:851108120562630686>",
        UserFlag.HouseBrilliance to "<:briliance:851108271376039936>",
        UserFlag.HouseBalance to "<:balance:851108061883531285>",
        UserFlag.EarlySupporter to "<:earlywumpus:851108590605172766>",
        UserFlag.TeamUser to "",
        UserFlag.System to "<:system:861768983157538816>",
        UserFlag.BugHunterLevel2 to "<:hunterlvl2:851109579601215498>",
        UserFlag.VerifiedBot to "<:vbot1:851109964009439232><:vbot2:851110026873012234>",
        UserFlag.VerifiedBotDeveloper to "<:dev:851108795694448680>"
    )

    fun getParsedFlags(paramFlag: UserFlags): List<String>? =
        if (paramFlag.code == 0) null
        else paramFlag.flags.mapNotNull { flag -> mapBadges[flag] }

    fun getParsedPerms(permissions: Set<Permission>): List<String>? =
        if (permissions.isEmpty()) null
        else permissions.mapNotNull { flag -> mapPerms[flag] }
}
