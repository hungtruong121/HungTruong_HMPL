const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
    name: String,
    kcal: Number,
    protein: Number,
    lipid: Number,
    glucid: Number,
    type: String,
});

module.exports = mongoose.model('Nutrition', NutritionSchema);