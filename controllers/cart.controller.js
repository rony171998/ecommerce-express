const { ProductsinCart } = require("../models/productsinCart.model");

const { catchAsync } = require("../utils/catchAsync.util");

const createproductsinCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body;

    const newproductsinCart = await ProductsinCart.create({
        productId,
        quantity,   
    });

    res.status(201).json({
        status: "success",
        newproductsinCart,
    });
});

const getAllproductsinCart = catchAsync(async (req, res, next) => {
    const productsinCarts = await ProductsinCart.findAll({  where: { status: 'active' },
        include: [
            {
                model: Review, include: { model: User },
            },
        ]
    });

    res.status(200).json({
        status: "success",
        productsinCarts,
    });
});

const getproductsinCartById = catchAsync(async (req, res, next) => {
	const { productsinCart } = req;

	res.status(200).json({
		status: 'success',
		productsinCart,
	});
});

const updateproductsinCart = catchAsync(async (req, res, next) => {
    const { productsinCart } = req;
    const { productId, quantity } = req.body;

    await ProductsinCart.update({ productId, quantity });

    res.status(200).json({ status: "success", productsinCart });
});

const deleteproductsinCart = catchAsync(async (req, res, next) => {
    const { productsinCart } = req;

    await ProductsinCart.update({ status: "deleted" });

    res.status(200).json({ status: "success" });
});

const postCartPurchase = catchAsync(async (req, res, next) => {
    const { productsinCart } = req;
    const { userId, comment, rating } = req.body;

    const newReview = await Review.create({
        userId,
        productsinCartId: productsinCart.id,
        comment,
        rating,
    });
    await productsinCart.update({
        rating: rating
    });

    res.status(200).json({ 
        status: "success", 
        newReview 
    });
});


module.exports = {
    createproductsinCart,
    getAllproductsinCart,
    getproductsinCartById,
    updateproductsinCart,
    deleteproductsinCart,
    postCartPurchase,
};
