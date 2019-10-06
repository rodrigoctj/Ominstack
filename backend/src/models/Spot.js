const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId, //esse tipo eh o do id padrao do mongo,
        ref: 'User'
    }
}, {
    toJSON : {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){ //virtual sao campos calculados em tempo de consulta, mas nao estao presentes na base
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);