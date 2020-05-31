const { body, validationResult } = require('express-validator');
const PessoaValidationRules = () => {
    return [
        body('nome').isString(),
        body('sobrenome').isString(),
        body('apelido').isString(),
        body('email').isEmail(),
        body('senha').isLength({ min: 6, max: 1024 })
    ]
}

module.exports = {
    PessoaValidationRules,
}
