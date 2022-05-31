const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    gpu: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    }
    /*,
    ram: {
        type: String,
        required: true
    },
    hdd: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }

     */
}, {timestamps: true });

const Product = mongoose.model('Product', productSchema );
module.exports = Product;