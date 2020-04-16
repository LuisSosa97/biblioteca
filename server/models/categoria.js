const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');

let schema = mongoose.Schema;

let categoriaSchema = new schema({
    nombre: {
        type: String,
        unique: true,
        required: true

    },
    usuario: {
        //se crea una llave foranea, dependiendo del esquema

        type: schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe se unico y diferente'
})

module.exports = mongoose.model('Categoria', categoriaSchema);