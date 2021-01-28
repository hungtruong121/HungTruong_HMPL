const NutritionsSchema = require('../models/nutritions');

// @desc    API for adding nutrition
// @route   /api/admin/nutrition

exports.addNutrition = async (req, res, next) => {
    try {
        const newNutrition = req.query;
        const addedNutrition = await NutritionsSchema.create(newNutrition);
        res.status(200).json({success: true, message: 'Added successfully'});
        console.log(addedNutrition);
    } catch (error) {
        
    }
};

// @desc    API for updating nutrition
// @route   /api/admin/nutrition/:id/?

exports.updateNutrition = async (req, res, next) => {
    try {
        const id = req.params;
        const newNutrition = req.query;
        const updatedNutrition = await NutritionsSchema.findByIdAndUpdate(id, newNutrition);
        res.status().json({success: true, message: 'Updated successfully'});
        console.log(updatedNutrition);
    } catch (error) {
        
    }
};

// @desc    API for deleting a nutrition
// @route   /api/admin/nutrition/:id
exports.deleteNutrition = async (req, res, next) => {
    try {
        const id = req.params;
        const deletedNutrition = await NutritionsSchema.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Deleted successfully'});
        console.log(deletedNutrition);
    } catch (error) {
        
    }
};

// @desc    API for geting nutritions
// @route   /api/admin/nutrition

exports.getNutritions = async (req, res, next) => {
    try {
        const nutrition = await NutritionsSchema.find({type: 'protein'});
        res.status(200).json({success: true, data: nutrition});
    } catch (error) {
        
    }
};

exports.test = async (req, res, next) => {
    try {
        const nutrition = await NutritionsSchema.find({type: 'glucid'});
        res.status(200).json({success: true, data: nutrition});
    } catch (error) {
        
    }
};