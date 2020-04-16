//para verificar el token que lo verifica el servidor

const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token');
    //verificara el token que se esa mandando
    jwt.verify(token, process.env.FIRMA, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: `Ocurrio un error al verificar el token  ${err}`
            });
        }
        req.usuario = decoded.usuario
        next();

    })
}
module.exports = {
    verificaToken
}