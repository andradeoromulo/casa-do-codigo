// Importando Controladores
const BaseControlador = require('../controladores/base-controlador');
const basecontrolador = new BaseControlador();


// Traçando e exportando rotas
module.exports = (app) => {
    
    // Importando URIs
    const rotasBase = BaseControlador.rotas();

    app.get(rotasBase.home, basecontrolador.exibeHome());

};