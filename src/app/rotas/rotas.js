// Importando o banco de dados
const db = require('../../config/database');

// Importando a classe LivroDAO
const LivroDAO = require('../infra/livro-dao');

// Traçando e exportando rotas
module.exports = (app) => {
    
    app.get('/', (req, resp) => {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `)
    });
    
    app.get('/livros', (req, resp) => {

        const livroDAO = new LivroDAO(db);
        livroDAO.listaLivros()
            .then(livros => 
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    { livros: livros}
                )
            ).catch(erro => console.log(erro));

    });
};