const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

let schema = mongoose.Schema;

let productoSchema = new schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    precioUni: {
        type: Number,
        required: [true, 'el precio es necesario']
    },
    categoria: {
        type: schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});
productoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente '
});
module.exports = mongoose.model('Productos', productoSchema);