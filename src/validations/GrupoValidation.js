const { body, validationResult } = require('express-validator');
const GrupoValidationRules = () => {
    return [
        body('nome').isString(),
        body('apelido_admin').isString(),
    ]
}

module.exports = {
    GrupoValidationRules,
}
