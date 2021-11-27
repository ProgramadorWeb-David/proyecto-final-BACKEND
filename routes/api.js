var express = require('express');
var router = express.Router();
var noticiasModel = require('./../models/noticiasModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


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



/* Contacto */
router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'davidx6x@hotmail.com',
        subject: 'Contacto desde la página web',
        html: `${req.body.nombre}  se contactó a traves de la web y solicita más información a éste correo:  ${req.body.email} <br>
        Su teléfono es ${req.body.telefono}  y te ha dejado éste mensaje: ${req.body.mensaje}`
    }


    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message:  'Mensaje enviado con exito!'
    });
});


    module.exports = router;