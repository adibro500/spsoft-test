const mongoose = require('mongoose')
// const beautifyUnique = require('mongoose-beautiful-unique-validation')

const PersonSchema = mongoose.Schema({
    name:  { type: String, index: true, unique:true, dropDups: true },
    desc:  { type: String },
    img_url:  { type: String, index: true, unique:true, dropDups: true },

}, {
    timestamps: true
})
// PersonSchema.plugin(beautifyUnique)


module.exports = mongoose.model('Person', PersonSchema)