const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const GrupoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    valorMinimo: {
        type: Number
    },
    valorMaximo: {
        type: Number
    },
    apelido_admin: { 
        type: String, 
        required: true 
    },
    members: [{
        _id: String,
        nome: String,
        sobrenome: String,
        apelido: String,
        email: String,
        listaDesejos: String,
        imagem: String
      }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

GrupoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Grupo', GrupoSchema);
