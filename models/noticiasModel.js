var pool = require('./bd');

async function getNoticias() {
    var query = 'SELECT id_noticia, titulo, fecha, autor, descripcion FROM noticias';
    var rows = await pool.query(query);
    return rows;
}


// funcion para insertar un nuevo array en la DB
async function insertarNoticia(obj) {
    try {
        var query = "INSERT INTO noticias SET ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getNoticias, insertarNoticia }