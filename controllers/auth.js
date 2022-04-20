const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo registrado con otro usuario'
            });
        }

        user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar en base de datos
        await user.save();
        //Generar JWT
        const token = await generateJWT(user.id, user.name);
        //Respuesta
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        //Confirmar password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            //Respuesta
            res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name);
        //Respuesta
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }
}

const revalidateToken = async (req, res) => {

    const { uid, name } = req;

    //Generar nuevo JWT y retornar en petición
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}