const { GuildSchema } = require('./MongoSchemas')
const mongoose = require('mongoose')

module.exports = class MongoDB {
    constructor (options = {}) {
        this.options = options
        this.mongoose = mongoose
    }
    async connect () {
        return mongoose.connect(process.env.MONGO_URI, this.options).then((m) => {
            this.guilds = new GuildSchema(m)
        })
    }
}