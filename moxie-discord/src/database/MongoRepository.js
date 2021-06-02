module.exports = class Repository {
    constructor(mongoose, model) {
        if (!mongoose || !model) throw new Error('Mongoose model cannot be null.');
        this.mongoose = mongoose;
        this.model = model;
    }

    add(entity) {
        return this.model.create(entity)
    }

    remove(entity) {
        return this.model.findByIdAndRemove(entity)
    }

    get(id, projection) {
        return this.findOne(id, projection).then(e => e || this.add({_id: id}))
    }

    findOne(entity, projection) {
        return this.model.findById(entity, projection)
    }

    async update(id, entity, options = {upsert: true}) {
        await this.get(id)
        return this.model.updateOne({_id: id}, entity, options)
    }
}