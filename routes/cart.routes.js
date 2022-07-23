const express = require('express');


const {
	
	createproductsinCart,
    getAllproductsinCart,
    getproductsinCartById,
    updateproductsinCart,
    deleteproductsinCart,
    postCartPurchase,
} = require('../controllers/cart.controller');


const {
	createproductsinCartValidators
} = require('../middlewares/validators.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const cartRouter = express.Router();

cartRouter.get('/', getAllproductsinCart);

cartRouter.get('/:id', getproductsinCartById);

cartRouter.use(protectSession);

cartRouter
	
	.post('/add-product', createproductsinCartValidators, createproductsinCart)
	.patch('/update-cart', updateproductsinCart)
	.delete('/:productId', deleteproductsinCart)
	.post('/purchase', postCartPurchase);

module.exports = { cartRouter };