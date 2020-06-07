const Pessoa = require('../models/Pessoa');
const bcrypt = require('bcryptjs');

module.exports = {

    async index(request, response) {
        try{
            
            const pessoa = await Pessoa.find();
            
            return response.send({ pessoa });

        } catch {
            return response.status(400).send({error: 'Erro'})
        }
    },

    async create(req, res) {
        try {

            let { nome, sobrenome, apelido, email, senha, createdAt } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(senha, salt);

            const retornoPessoa = await Pessoa.create({
                nome,
                sobrenome,
                apelido,
                email,
                senha : hashedPassword,
                createdAt
            });

            return res.send({ retornoPessoa });

        } catch (err) {
            return res.status(400).send(err);
        }
    },
    
    async edit(req, res) {
       try {
            
           let { id } = req.params

           const retornoPessoa = await Pessoa.findByIdAndUpdate(id, req.body, {new: true});

           return res.send({ retornoPessoa });

        } catch {
            return res.status(400).send({error: 'Erro ao atualizar informações'});
        }
    }
}