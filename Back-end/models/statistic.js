const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
    protein: Number,
    lipid: Number,
    glucid: Number
});

module.exports = mongoose.model('Statistic', StatisticSchema);