const Pessoa = require('../models/Pessoa');
const Grupo = require('../models/Grupo');

module.exports = {
    async index(request, response) {
        try{

            const {page = 1} = request.query;
            const grupo = await Grupo.paginate({}, {page, limit : 5});
            
            return response.send({ grupo });

        } catch {
            return response.status(400).send({error: 'Erro ao listar grupos'})
        }
    },

    async create(req, res) {
        try {

            let { 
                nome, 
                valorMinimo, 
                valorMaximo, 
                apelido_admin, 
                createdAt 
            } = req.body;

            const retornoGrupo = await Grupo.create({
                nome,
                apelido_admin,
                valorMinimo,
                valorMaximo,
                createdAt
            });

            return res.json({ retornoGrupo });

        } catch (err) {
            return res.status(400).send(err);
        }
    },

    async addNewMember(request, response) {
        let { _idGrupo, nick } = request.params;

        const membro = await Pessoa.findOne({ apelido: nick })

        if (!membro) {
            return response.status(404).json({ Error: "Apelido não encontrado" })
        }

        const jaMembro = await Grupo.findOne({ _id: _idGrupo, members: { "$elemMatch": { "apelido": nick } }})

        if (!jaMembro || jaMembro.length === 0) {
            Grupo.findByIdAndUpdate(_idGrupo, {"$push": {"members": membro}}, {new: true}, async (err, res) => {

                if (err) {
                    return response.status(400).json({ Error: "Erro!" })
                }

                if (!res) {
                    return response.status(404).json({ Error: "Grupo não encontrado" })
                }

                return response.send(res);
            })
        } else {
            return response.status(400).json({ Error: "Você já faz parte deste grupo" })
        }

    },

    async removeMember(request, response) {
        let { _idGrupo, nick } = request.params;

        const membro = await Pessoa.findOne({ apelido: nick })

        if (!membro) {
            return response.status(404).json({ Error: "Apelido não encontrado" })
        }

        const grupo = await Grupo.findOne({_id: _idGrupo, members: {"$elemMatch": { "apelido": nick }}})

        if(!grupo) {
            return response.status(400).json({ Error: "Está pessoa não é membra do grupo"});
        }

        if(grupo.apelido_admin === membro.apelido) {
            return response.status(418).json({ Error: "Não é possivel remover o adm do grupo"});
        }

        Grupo.findOneAndUpdate({_id: _idGrupo}, {"$pull": {members: {apelido: nick}}}, { new: true}, async (err, res) => {
            if (err) {
                return response.status(500).json({Error: "Erro!"})
            }

            return response.send(res);
            
        })
    }
}