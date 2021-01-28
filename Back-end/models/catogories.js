const mongoose = require('mongoose');

const CatogorySchema = new mongoose.Schema({ 
    name: String,
    type: String,
    id_nutrition: String
});

module.exports = mongoose.model('Catogory', CatogorySchema);