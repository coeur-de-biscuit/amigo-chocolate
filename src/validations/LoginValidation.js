const { body, validationResult } = require('express-validator');
const LoginValidationRules = () => {
    return [
        body('email').isEmail(),
        body('senha').isLength({ min: 6, max: 1024 })
    ]
}

module.exports = {
    LoginValidationRules,
}
