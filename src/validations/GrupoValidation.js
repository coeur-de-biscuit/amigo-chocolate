const { body, validationResult } = require('express-validator');
const GrupoValidationRules = () => {
    return [
        body('nome').isString(),
        body('valorMinimo').isNumeric(),
        body('valorMaximo').isNumeric(),
        body('apelido_admin').isString(),
    ]
}

module.exports = {
    GrupoValidationRules,
}
