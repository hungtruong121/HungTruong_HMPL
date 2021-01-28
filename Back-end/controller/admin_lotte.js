const lotteData = require('../middleware/lotte');
const ProductsSchema = require('../models/products');
// @desc    API for checking to get data from lotte is right
// @route   /api/admin/lotte

exports.checkFoodsFromLotte = async (req, res, next) => {
    try {
        const newFood = await lotteData();
        if(newFood){
            res.status(200).json({success: true});
        } else {
            res.status(200).json({success: false});
        }
    } catch (error) {
        
    }
};

// @desc    API for updating data which is got lotte
// route    /api/admin/lotte

exports.updateFoods = async (req, res, next) => {
    try {
        const newFood = await lotteData();
        if(newFood){
            await ProductsSchema.deleteMany();
            await ProductsSchema.insertMany(newFood);
            res.status(201).json({success: true, message: 'Updated successfully'});
        } else {
            res.status(500).json({success: false});
        }
    } catch (error) {
        
    }
};

// route    /api/admin/lotte/:id/?
exports.updateFoodWithID = async (req, res, next) => {
    try {
        const id = req.params;
        const newFood = req.query;
        const updatedFood = await ProductsSchema.findByIdAndUpdate({_id: id}, newFood);
        console.log(updatedFood);
        res.status(200).json({success: true, message: 'Updated successfully'});
    } catch (error) {
        
    }
};

// @desc    API for deleting data which is got lotte
// @route   /api/admin/lotte/:id

exports.deleteFoodWithID = async (req, res, next) => {
    try {
        const id = req.params;
        const deletedFood = await ProductsSchema.findByIdAndDelete(id);
        res.status().json({success: true, message: 'Deleted successfully'});
        console.log(deletedFood);
    } catch (error) {
        
    }
};

// @desc    API for creating data
// @route   /api/admin/lotte/?

exports.createFood = async (req, res, next) => {
    try {
        const newFood = req.query;
        if(!newFood) res.status(404).json({success: false});
        const createdFood = await ProductsSchema.create(newFood);
        res.status(201).json({success: true, message: 'Created successfully'});
        console.log(createdFood);
    } catch (error) {

    }
};

exports.test = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};