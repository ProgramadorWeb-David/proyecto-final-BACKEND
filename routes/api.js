var express = require('express');
var router = express.Router();
var noticiasModel = require('./../models/noticiasModel');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/novedades', async function (req, res, next) {
    
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

    res.json(noticias);
});


    module.exports = router;