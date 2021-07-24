package discord.special.utilities

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import java.io.File

object HoconUtils {
    private val conf: Config = ConfigFactory.load(ConfigFactory.parseFile(File("configuration/common/discord.conf")))
    private val cached = listOf(conf.getString("client.PREFIX"))
    val TOKEN: String = conf.getString("client.TOKEN")
    val PREFIX: String = cached[0]
}