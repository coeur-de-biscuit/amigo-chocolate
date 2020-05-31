const Pessoa = require('../models/Pessoa');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = { 

    async login(req, res) {

        let { email, senha } = req.body;

        const user = await Pessoa.findOne({ email }).select('+senha')

        if(!user)
            return res.status(400).send({ error: "User not Found"});

        if(!await bcrypt.compare(senha, user.senha))
            return res.status(400).send({ error: "Senha Invalida" })

        //Dando um token para o User
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 300});
        
        
        return res.send({ user: user, auth: true, token: token});
        
        //res.header('auth-token', token).send(token);

    }

}