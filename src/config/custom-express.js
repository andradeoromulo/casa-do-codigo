// Importanto e habilitando o Marko
require('marko/node-require').install();
require('marko/express');

// Importando o módulo Express 
const express = require('express');
const app = express();

// Importando as rotas
const rotas = require('../app/rotas/rotas');
rotas(app);

// Exportanto o objeto app
module.exports = app;