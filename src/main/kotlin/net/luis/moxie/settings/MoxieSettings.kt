package net.luis.moxie.settings

import kotlinx.serialization.Serializable

@Serializable
data class MoxieSettings(
    val client: MoxieClientSettings
)

@Serializable
data class MoxieClientSettings(
    val token: String,
    val prefix: String
)