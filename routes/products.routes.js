const express = require('express');


const {
	
	createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
	getProductById,

} = require('../controllers/products.controller');

const {
	getAllCategories,
	postCategories,
	patchCategories,
	deleteCategories,

} = require('../controllers/categories.controller');

const {
	createProductValidators
} = require('../middlewares/validators.middleware');

const {
	protectSession,
	protectUserAdmin,
} = require('../middlewares/auth.middleware');
const { productExists } = require('../middlewares/products.middleware');
const { categoryExists } = require('../middlewares/categories.middleware');

const productsRouter = express.Router();

productsRouter.get('/', getAllProduct);

productsRouter.get('/categories', getAllProduct);

productsRouter.use(protectSession);

productsRouter.post('/', createProductValidators, createProduct);

productsRouter
	.use('/:id', productExists)
	.route('/:id')
	.get(getProductById)
	.patch(protectUserAdmin, updateProduct)
	.delete(protectUserAdmin, deleteProduct);

productsRouter
	.get('/categories', getAllCategories)
	.post('/categories', createProductValidators, postCategories)
	.patch('/categories/:id', categoryExists ,patchCategories)
	.delete('/categories/:id', categoryExists ,deleteCategories);

module.exports = { productsRouter };