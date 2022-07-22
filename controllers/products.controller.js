const { Product } = require('../models/product.model');

const {catchAsync} = require('../utils/catchAsync.util');

const createProduct = catchAsync(async (req, res, next) => {
	const { title, description , price ,categoryId ,quantity  } = req.body;
	const { sessionUser } = req;
	const newProduct = await Product.create({
		title,
		description,
		price,
		categoryId,
		quantity,
		userId: sessionUser.id,
	});

	res.status(201).json({
		status: 'success',
		newProduct,
	});
});

const getAllProduct = catchAsync(async (req, res, next) => {
	const products = await Product.findAll({ 
		where: { status: 'active' },
	});

	res.status(200).json({
		status: 'success',
		products,
	});
});

const getProductById = catchAsync(async (req, res, next) => {
	const { products } = req;		

	res.status(200).json({
		status: 'success',
		products,
	});
});

const updateProduct = catchAsync(async (req, res, next) => {
	const { products } = req;
	const { title,description,price,quantity } = req.body;

	await products.update({ title,description,price,quantity });

	res.status(200).json({ status: 'success', products });
});

const deleteProduct = catchAsync(async (req, res, next) => {
	const { products } = req;

	await products.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
});

module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
	getProductById,
	
}