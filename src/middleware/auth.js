const jwt = require('jsonwebtoken');
const Pessoa = require('../models/Pessoa');

module.exports = async(req, res, next) => {
    const token = req.header('auth-token').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    try {
        const user = await Pessoa.findOne({ _id: data._id });
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next();

    } catch (err) {
        res.status(401).send({error: 'Não autorizados a acessar esses recursos!'})
    }
    
    // const token = req.header('auth-token');
    // if(!token) return res.status(401).send('Access Denied');

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    //     req.user = verified;

    //     next();
        
    // } catch (err) {
    //     res.status(400).send('Invalid Token');
    // }
}