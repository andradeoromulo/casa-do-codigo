// Importando o banco de dados
const db = require('../../config/database');

// Importando a classe LivroDAO
const LivroDAO = require('../infra/livro-dao');
const livroDAO = new LivroDAO(db);

// Importando o express-validator
const { check, validationResult } = require('express-validator/check');

// Traçando e exportando rotas
module.exports = (app) => {
    
    app.get('/', (req, resp) => {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });
    
    app.get('/livros', (req, resp) => {

        livroDAO.lista()
            .then(livros => 
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    { livros: livros}
                )
            ).catch(err => console.log(err));

    });

    app.get('/livros/form', (req, resp) => 
        resp.marko(
            require('../views/livros/form/form.marko'),
            { livro: {} }
        )
    );

    app.get('/livros/form/:id', (req, resp) => {
        const id = req.params.id;

        livroDAO.busca(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro}
                )
            ).catch(err => console.log(err));
    });

    app.post(
        '/livros',
        [
            check('titulo').isLength({ min: 5 }).withMessage('O título deve ter 5 caracteres no mínimo!'),
            check('preco').isCurrency().withMessage('O preço deve ter formato monetário!')
        ], 
        (req, resp) => {
        
        const err = validationResult(req);

        if(!err.isEmpty()) {
            return resp.marko(
                require('../views/livros/form/form.marko'),
                {   livro: req.body,
                    errosValidacao: err.array()
                }  
            );
        }
        
        livroDAO.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(err => console.log(err));

    });

    app.put('/livros', (req, resp) => {
        
        livroDAO.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(err => console.log(err));

    });

    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;

        livroDAO.remove(id)
            .then(resp.status(200).end())
            .then(err => console.log(err));
    });

};