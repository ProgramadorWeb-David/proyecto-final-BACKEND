var pool = require('./bd');

async function getNoticias() {
    var query = 'SELECT * FROM noticias';
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


// funcion para eliminar un nuevo array en la DB
async function borrarNoticia(id) {
    var query = 'DELETE from noticias WHERE id_noticia = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}



// funcion para modificar un elemento del array
async function getModificaNoticia(id) {
    var query = 'SELECT * FROM noticias WHERE id_noticia = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}


async function modificarNoticia(obj, id) {
    try {
        var query = 'UPDATE noticias SET ? WHERE id_noticia = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}


module.exports = { getNoticias, insertarNoticia, borrarNoticia, getModificaNoticia, modificarNoticia }