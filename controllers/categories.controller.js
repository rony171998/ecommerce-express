const { Category } = require('../models/category.model');

const {catchAsync} = require('../utils/catchAsync.util');


const getAllCategories = catchAsync(async (req, res, next) => {
	const categories = await Category.findAll({ 
		where: { status: 'active' },
	});

	res.status(200).json({
		status: 'success',
		categories,
	});
});

const postCategories = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const newCategory = await Category.create({
		name,
	});

	res.status(201).json({
		status: 'success',
		newCategory,
	});
});

const patchCategories = catchAsync(async (req, res, next) => {
	const { categories } = req;
	const { name } = req.body;

	await categories.update({ name });

	res.status(200).json({ status: 'success', categories });
})

const deleteCategories = catchAsync(async (req, res, next) => {
	const { categories } = req;

	await categories.update({ status: 'deleted' });

	res.status(200).json({ status: 'success' });
})

module.exports = {
	getAllCategories,
	postCategories,
	patchCategories,
	deleteCategories,
}