const CatogoriesSchema = require('../models/catogories');
const NutritionSchema = require('../models/nutritions');
const ProductSchema = require('../models/products');
const classify = require('../middleware/catogory');

// @desc    API for adding catogory
// @route   /api/admin/catogory/?





exports.test = async (req, res, next) => {
    try {
        const foods = await ProductSchema.find({type: 'protein'});
        const nutrition = await NutritionSchema.find({type: 'protein'});
        const newFoods = classify(foods, nutrition);
        res.json({data: newFoods});
    } catch (error) {
        
    }
};