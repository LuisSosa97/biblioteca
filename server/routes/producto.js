const express = require('express');
const app = express();
const _ = require('underscore');
const Productos = require('../models/productos');

app.post('/productos', function(req, res) {
    let body = req.body;
    console.log(body);

    let producto = new Productos({

        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria,
        usuario: body.usuario
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

        res.json({
            ok: true,
            mensaje: 'El producto se ha insertada con exito',
            producto: productoDB
        });
    });
});

app.delete('/productos/:id', function(req, res) {
    let id = req.params.id;

    Productos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de eliminar el producto intente de nuevo ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Producto ya no se encuentra en el inventario',
            resp
        });
    });
});
app.get('/productos', function(req, res) {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;

    desde = Number(desde);
    limite = Number(limite);

    Productos.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `ocurrio un error ${err}`
                });

            }
            res.json({
                ok: false,
                mensaje: 'consulta realizada con exito',
                productos
            })
        });
});

app.put('/productos/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'Usuario', 'Categoria']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }

        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            usuario: productoDB
        });
    });
});


module.exports = app;