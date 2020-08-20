// Importando Controladores
const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();


// Traçando e exportando rotas
module.exports = (app) => {
    
    // Importando URIs
    const rotasBase = BaseControlador.rotas();

    app.get(rotasBase.home, baseControlador.exibeHome());

    app.route(rotasBase.login)
        .get(baseControlador.exibeFormLogin())
        .post(baseControlador.efetuaLogin());

};