const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Order } = require('./models/order.model');
const { Cart } = require('./models/cart.model');
const { Category } = require('./models/category.model');
const { Product } = require('./models/product.model');
const { ProductsinCart} = require('./models/productsinCart.model');
const { ProductImg } = require('./models/productImg.model');

// Utils
const { db } = require('./utils/database.util');


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

	
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);
Order.belongsTo(Cart);
Cart.belongsTo(User);
Cart.hasMany(ProductsinCart, { foreignKey: 'cartId' });
ProductsinCart.belongsTo(Cart);
ProductsinCart.belongsTo(Product);
Product.belongsTo(Category);
Product.hasMany(ProductsinCart, { foreignKey: 'productId' });
Product.hasMany(ProductImg, { foreignKey: 'productId' });
ProductImg.belongsTo(Product);
Category.hasMany(Product, { foreignKey: 'categoryId' });
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });


db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));
	
	const PORT = process.env.PORT || 4000;
	const HOST = process.env.DB_HOST;
app.listen(PORT,HOST,  () => {
	console.log('Express app running!! on port '+PORT +' on port '+HOST);
});
