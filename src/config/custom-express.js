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

// Importando configurações de sessão
const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

// Importando as rotas
const rotas = require('../app/rotas/rotas');
rotas(app);

/* Adicionando um middleware para filtrar requisições inválidas
   Se a requisição chegou até aqui, é porque nada foi retornado
   e provavelmente há algo de errado */
app.use((req, resp, next) => {
    return resp.status(404).marko(
        require('../app/views/base/erros/404.marko')
    );
});

app.use((err, req, resp, next) => {
    return resp.status(500).marko(
        require('../app/views/base/erros/500.marko')
    );
});


// Exportanto o objeto app
module.exports = app;