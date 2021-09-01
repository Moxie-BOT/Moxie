package net.moxie.platform.discord.implementations

import dev.kord.common.entity.Snowflake
import dev.kord.core.entity.Guild
import dev.kord.core.entity.Member
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import net.moxie.common.utils.MoxieSettings

suspend fun checkRolesPosition(member: Member?, guild: Guild): Boolean {
    if (member == null) return true
    val moxieMember = guild.getMember(Snowflake(MoxieSettings.instance.discord.clientID))
    if (member.isOwner() || moxieMember.id.value == member.id.value) return false

    val highestOther = member.roles.map { it.rawPosition }.toList().maxOrNull()
        ?: 0
    val highestSelf = moxieMember.roles.map { it.rawPosition }.toList()
        .maxOrNull()
        ?: 0

    return highestSelf > highestOther
}
