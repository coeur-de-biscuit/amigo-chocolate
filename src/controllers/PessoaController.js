const Pessoa = require('../models/Pessoa');
const Grupo = require('../models/Grupo');
const bcrypt = require('bcryptjs');

module.exports = {

    async index(request, response) {
        try{
            
            const pessoa = await Pessoa.find();
            
            return response.json(pessoa);

        } catch {
            return response.status(400).send({error: 'Erro'})
        }
    },

    async show(request, response) {
        
        const { id } = request.params;

        const pessoa = await Pessoa.findOne({ _id: id });

        if (!pessoa) {

        return response.status(404).json({ Error: "User not found" });
        }

        return response.json(pessoa);
    },

    async create(req, res) {
        try {

            let { nome, sobrenome, apelido, email, senha, createdAt } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(senha, salt);

            const retornoPessoa = await Pessoa.create({
                imagem: `http://192.168.100.150:3333/uploads/Default-Profile-Female.jpg`,
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
    },

    async addProfImage(req, res) {
        try {
             
            let { id } = req.params;

            const retornoPessoa = await Pessoa.findByIdAndUpdate(id, {imagem: `http://192.168.100.150:3333/uploads/${req.file.filename}`}, {new: true});

            return res.send({ retornoPessoa });  
 
         } catch {
             return res.status(400).send({error: 'Erro ao atualizar informações'});
         }
     },


     async addDesejos(req, res) {
        try {
             
            let { id } = req.params
 
            const retornoPessoa = await Pessoa.findByIdAndUpdate(id, req.body, {new: true});
 
            return res.send({ retornoPessoa });
 
         } catch {
             return res.status(400).send({error: 'Erro ao atualizar informações'});
         }
     },
}