require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'qwewe56ewe23',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/ecommerce'
};
