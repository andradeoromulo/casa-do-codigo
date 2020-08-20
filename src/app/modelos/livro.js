// Importando express-validator
const { check } = require('express-validator/check');

class Livro {
    
    static valida() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O título deve ter 5 caracteres no mínimo!'),
            check('preco').isCurrency().withMessage('O preço deve ter formato monetário!')
        ];
    }
}

module.exports = Livro;