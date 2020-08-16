// Importanto e habilitando o Marko
require('marko/node-require').install();
require('marko/express');

// Importando o módulo Express 
const express = require('express');
const app = express();

// Importando o body-parser e o method-override
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Configurando middlewares
app.use('/estatico/', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Importando as rotas
const rotas = require('../app/rotas/rotas');
rotas(app);

// Exportanto o objeto app
module.exports = app;