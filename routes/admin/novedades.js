var express = require('express');
var router = express.Router();
var noticiasModel = require('../../models/noticiasModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    
    var noticias = await noticiasModel.getNoticias();

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

module.exports = router;