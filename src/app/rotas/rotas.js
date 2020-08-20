// Importando rotas
const livroRotas = require('./livro-rotas');
const baseRotas = require('./base-rotas');

// Traçando e exportando rotas
module.exports = (app) => {
    baseRotas(app);
    livroRotas(app);
};