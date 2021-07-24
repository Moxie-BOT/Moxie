package net.luis.moxie

import com.typesafe.config.ConfigFactory
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.hocon.Hocon
import kotlinx.serialization.hocon.decodeFromConfig
import net.luis.moxie.listeners.setupMessageCreatedListener
import net.luis.moxie.listeners.setupReadyListener
import java.io.File

@OptIn(ExperimentalSerializationApi::class)
val moxie by lazy {
    runBlocking {
        moxie(Hocon.decodeFromConfig(ConfigFactory.parseFile(File("configuration/common/discord.conf"))))
    }
}

suspend fun main() {
    with(moxie.kord) {
        setupMessageCreatedListener()
        setupReadyListener()
        login()
    }
}
