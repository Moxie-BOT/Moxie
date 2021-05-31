const MongoRepository = require("../MongoRepository");

module.exports = class GuildRepository extends MongoRepository {
    constructor(mongoose) {
        super(mongoose, mongoose.model('Guilds', new mongoose.Schema({
                _id: {
                    type: String,
                    default: null
                },
                prefix: {
                    type: String,
                    default: "mx!"
                }
            })
        ))
    }
}
