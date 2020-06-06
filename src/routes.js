const express = require('express');
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

//ROTES
routes
    //Pessoa
  .get('/pessoa', PessoaController.index)
  .post('/pessoa', PessoaValidationRules(), validate, PessoaController.create)
  .put('/pessoa/:id', PessoaValidationRules(), validate, PessoaController.edit)
    //Grupos
  .get('/grupo', GrupoController.index)
  .post('/grupo', auth, validate, GrupoController.create)
  .post('/grupo/add/:_idGrupo/:nick', GrupoController.addNewMember)
  .post('/grupo/remove/:_idGrupo/:nick', GrupoController.removeMember)
    //Login
  .post('/login', LoginValidationRules(), validate, LoginController.login)

module.exports = routes;

