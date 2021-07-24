@file:JvmName("ReadyListener")
package net.luis.moxie.listeners

import dev.kord.core.Kord
import dev.kord.core.event.gateway.ReadyEvent
import dev.kord.core.on

fun Kord.setupReadyListener() = on<ReadyEvent> {
    println("${self.username} - Online")
}