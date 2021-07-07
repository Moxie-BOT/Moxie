module.exports = class Repository {
  constructor (mongoose, model) {
    if (!mongoose || !model) throw new Error('Mongoose model cannot be null.')
    this.mongoose = mongoose
    this.model = model
  }

  add (entity) {
    return this.model.create(entity)
  }

  remove (entity) {
    if (typeof entity === 'string') entity = { _id: entity }
    return this.model.findOneAndDelete(entity)
  }

  get (id, projection) {
    return this.findOne(id, projection).then(e => e || this.add({ _id: id }))
  }

  findOne (entity, projection) {
    return this.model.findById(entity, projection)
  }

  async update (id, entity, options = { upsert: true }) {
    await this.get(id)
    return this.model.updateOne({ _id: id }, entity, options)
  }

  findAll (projection) {
    return this.model.find({}, projection)
  }
}
