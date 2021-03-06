const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.get('/imagen/:ruta/:nombre', (res, req) => {
    let ruta = req.params.ruta;
    let nombreImagen = req.params.nombre;
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);
    let noImage = path.resolve(__dirname, `../assets/no-image.png`)


    if (fs.existsSync(rutaImagen)) {
        return res.sendFile(rutaImagen)
    } else {
        return res.sendFile(noImage);
    }
});


module.exports = app;