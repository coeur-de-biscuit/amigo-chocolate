const express = require('express');
const routes = express.Router();

//JWT TOKEN
const auth = require('./middleware/auth');

//CONTROLLERS
const PessoaController = require('./controllers/PessoaController');
const loginController = require('./controllers/LoginController');

//VALIDATORS
const { validate } = require('./middleware/validator');
const { PessoaValidationRules } = require('./validations/PessoaValidation');
const { LoginValidationRules } = require('./validations/LoginValidation');

//ROTES
routes
    //Pessoa
  .get('/pessoa', PessoaController.index)
  .post('/pessoa', PessoaValidationRules(), validate, PessoaController.create)
  .put('/pessoa/:id', PessoaValidationRules(), validate, auth, PessoaController.edit)
    //Login
  .post('/login', LoginValidationRules(), validate, loginController.login)

module.exports = routes;

