var express = require('express');
var router = express.Router();
var noticiasModel = require('../../models/noticiasModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



/* GET home page. */
router.get('/', async function (req, res, next) {
    
    let noticias = await noticiasModel.getNoticias();

    noticias = noticias.map(not => {
        if (not.img_id) {
            const imagen = cloudinary.image(not.img_id, {
                width: 100,
                height: 100,
                crop: 'fill'
            });

            return {
                ...not,
                imagen
            }
        } else {
            return {
                ...not,
                imagen: ''
            }
        }
    });

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
            
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }


        if (req.body.titulo != "" && req.body.fecha != "" && req.body.autor != "" && req.body.descripcion != "") {
            await noticiasModel.insertarNoticia({
                ...req.body,
                img_id
            });


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

    let noticia = await noticiasModel.getModificaNoticia(id);
    if (noticia.img_id) {
        await (destroy(noticia.img_id));
    }

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

        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0 ) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }



        let obj = {
            titulo: req.body.titulo,
            fecha: req.body.fecha,
            autor: req.body.autor,
            descripcion: req.body.descripcion,
            img_id
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