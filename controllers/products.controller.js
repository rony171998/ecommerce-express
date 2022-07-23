const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const { Product } = require('../models/product.model');
const { ProductImg } = require('../models/productImg.model');

const {catchAsync} = require('../utils/catchAsync.util');
const { storage } = require('../utils/firebase.util');

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

	if (req.files.length > 0) {
		const filesPromises = req.files.map(async (file) => {
			const imgRef = ref(storage,`products/${Date.now()}_${file.originalname}`);
			const imgRes = await uploadBytes(imgRef, file.buffer);

			return await ProductImg.create({
				productId: newProduct.id,
				imgUrl: imgRes.metadata.fullPath,
			});
		});

		await Promise.all(filesPromises);
		
	}

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
	
	const productImgsPromises = products.ProductImgs.map(async (productImg) => {
		const imgRef = ref(storage, productImg.imgUrl);

		const imgFullPath = await getDownloadURL(imgRef);

		productImg.imgUrl = imgFullPath;
	});

	await Promise.all(productImgsPromises);

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