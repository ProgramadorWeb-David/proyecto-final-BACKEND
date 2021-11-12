var express = require('express');
var router = express.Router();
var noticiasModel = require('../../models/noticiasModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    
    let noticias = await noticiasModel.getNoticias();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.user,
        noticias
    });
});



/* GET home page. */
router.get('/agregar', async function (req, res, next) {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});



// metodo post para enviar los datos de una nueva noticia cargada por el usuario
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.fecha != "" && req.body.autor != "" && req.body.descripcion != "") {
            await noticiasModel.insertarNoticia(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Atención:  todos los campos son requeridos!'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'WARNING:  error al cargar la noticia!'
        })
    }
});


// metodo get para eliminar una noticia
router.get('/eliminar/:id', async (req, res, next) => {
    let id = req.params.id;
    await noticiasModel.borrarNoticia(id);
    res.redirect('/admin/novedades');
});




// metodo get para modificar una noticia
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    console.log(req.params.id);
    let noticia = await noticiasModel.getModificaNoticia(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        noticia
    })
});



// aqui modificamos la noticia por el id
router.post('/modificar', async (req, res, next) => {
    try {

        let obj = {
            titulo: req.body.titulo,
            fecha: req.body.fecha,
            autor: req.body.autor,
            descripcion: req.body.descripcion
        }

        let id = req.body.id;

        await noticiasModel.modificarNoticia(obj, id);
        res.redirect('/admin/novedades');

    } catch (error) {
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la noticia'
        })
    }
});


module.exports = router;