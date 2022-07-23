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
	protectProductAccount,
} = require('../middlewares/auth.middleware');
const { upload } = require('../utils/upload.util');
const { productExists } = require('../middlewares/products.middleware');
const { categoryExists } = require('../middlewares/categories.middleware');

const productsRouter = express.Router();

productsRouter.get('/', getAllProduct);

productsRouter.get('/categories', getAllProduct);

productsRouter.use(protectSession);

productsRouter.post('/', upload.array('productImg',5) ,createProductValidators, createProduct);


productsRouter
	.use('/:id', productExists)
	.route('/:id')
	.get(getProductById)
	.patch(protectProductAccount, updateProduct)
	.delete(protectProductAccount, deleteProduct);

productsRouter
	.get('/categories', getAllCategories)
	.post('/categories', createProductValidators, postCategories)
	.patch('/categories/:id', categoryExists ,patchCategories)
	.delete('/categories/:id', categoryExists ,deleteCategories);

module.exports = { productsRouter };