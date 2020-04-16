const expres = require('express');
const app = expres();
const _ = require('underscore');
const Categoria = require('../models/categoria');


app.get('/categoria', function(req, res) {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;

    desde = Number(desde);
    limite = Number(limite);

    Categoria.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, Categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `ocurrio un error ${err}`
                });
            }
            res.json({
                ok: false,
                mensaje: 'consulta realizada con exito',
                Categorias
            })
        })
});

app.post('/categoria', function(req, res) {
    let body = req.body;
    console.log(body);

    let categoria = new Categoria({

        nombre: body.nombre,
        usuario: body.usuario
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

        res.json({
            ok: true,
            mensaje: 'El usuario ha sido insertado con exito',
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'Usuario']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }

        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            categoria: categoriaDB
        });
    });
});

app.delete('/categoria/:id', function(req, res) {
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: ` Ocurrio un error al momento de eliminar categoria ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'categoria eliminada con exito',
            resp
        });
    });
});

module.exports = app;