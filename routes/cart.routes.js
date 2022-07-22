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
	protectOrderAccount,
} = require('../middlewares/auth.middleware');

const cartRouter = express.Router();

cartRouter.get('/', getAllproductsinCart);

cartRouter.get('/:id', getproductsinCartById);

cartRouter.use(protectSession);

cartRouter
	
	.post('/add-product', createproductsinCartValidators, createproductsinCart)
	.patch('/update-cart',protectOrderAccount, updateproductsinCart)
	.delete('/:productId',protectOrderAccount, deleteproductsinCart)
	.post('/purchase',protectOrderAccount, postCartPurchase);

module.exports = { cartRouter };