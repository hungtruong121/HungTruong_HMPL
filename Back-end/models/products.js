const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    img: String,
    url: String,
    id_catogory: String,
});

module.exports = mongoose.model('Products', ProductsSchema);