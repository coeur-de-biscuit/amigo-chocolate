const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

//JWT TOKEN
const auth = require('./middleware/auth');

//CONTROLLERS
const PessoaController = require('./controllers/PessoaController');
const GrupoController = require('./controllers/GruposController');
const LoginController = require('./controllers/LoginController');

//VALIDATORS
const { validate } = require('./middleware/validator');
const { PessoaValidationRules } = require('./validations/PessoaValidation');
const { LoginValidationRules } = require('./validations/LoginValidation');
const { GrupoValidationRules } = require('./validations/GrupoValidation');

//ROTES
routes
    //Pessoa
  .get('/pessoa', PessoaController.index)
  .get('/pessoa/:id', PessoaController.show)
  .get('/pessoa/:id', PessoaController.addDesejos)
  .post('/pessoa', multer(multerConfig).single(`imagem`) ,PessoaValidationRules(), validate, PessoaController.create)
  .put('/pessoa/:id', auth,PessoaValidationRules(), PessoaController.edit)
  .put('/pessoa/change/:id', multer(multerConfig).single(`imagem`), PessoaValidationRules(), PessoaController.addProfImage)
    //Grupos
  .get('/grupo', auth, GrupoController.index)
  .post('/grupo', GrupoValidationRules(), auth, validate, GrupoController.create)
  .delete('/grupo/:_id', auth, GrupoController.deleteGroup)
  .post('/grupo/:_idGrupo/:nick', auth, GrupoController.addNewMember)
  .post('/grupo/remove/:_idGrupo/:nick', auth, GrupoController.removeMember)
    //Login
  .post('/login', LoginValidationRules(), validate, LoginController.login)

module.exports = routes;

