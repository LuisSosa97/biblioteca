// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Firma SECRETA DE JWT
process.env.FIRMA = process.env.FIRMA || 'A9597206370*';


//CONEXION A LA BASE DE DATOS

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Starbucks'
} else {
    urlDB = 'mongodb+srv://admin:140797@cluster0-tsywd.mongodb.net/biblioteca?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;