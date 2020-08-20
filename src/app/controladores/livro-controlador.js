// Importando o banco de dados
const db = require('../../config/database');

// Importando os templates
const templates = require('../views/templates');

// Importando LivroDAO
const LivroDAO = require('../infra/livro-dao');
const livroDAO = new LivroDAO(db);

// Importando o validatioResult
const { validationResult } = require('express-validator/check');

class LivroControlador {

    static rotas() {
        return {
            autenticadas: '/livros*', //todas as URLS de livro/ seguido de qualquer coisa
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }
    
    lista() {
        return function(req, resp) {

            livroDAO.lista()
                .then(livros => 
                    resp.marko(
                        templates.livros.lista,
                        { livros: livros}
                    )
                )
                .catch(err => console.log(err));
        };
    }

    exibeFormCadastro() {
        return function(req, resp) { 
            resp.marko(
                templates.livros.form,
                { livro: {} }
            )
        };
    }

    exibeFormEdicao() {
        return function(req, resp) {
            const id = req.params.id;
    
            livroDAO.busca(id)
                .then(livro =>
                    resp.marko(
                        templates.livros.form,
                        { livro: livro}
                    )
                ).catch(err => console.log(err));
        }
    }

    cadastra() {
        return function(req, resp) {
        
            const err = validationResult(req);
    
            if(!err.isEmpty()) {
                return resp.marko(
                    templates.livros.form,
                    {   livro: req.body,
                        errosValidacao: err.array()
                    }  
                );
            }
            
            livroDAO.adiciona(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))
                .catch(err => console.log(err));
    
        };
    }

    edita() {
        return function(req, resp) {

            const err = validationResult(req);
    
            if(!err.isEmpty()) {
                return resp.marko(
                    templates.livros.form,
                    {   livro: req.body,
                        errosValidacao: err.array()
                    }  
                );
            }
        
            livroDAO.atualiza(req.body)
                .then(resp.redirect(LivroControlador.rotas().lista))
                .catch(err => console.log(err));
    
        };
    }

    remove() {
        return function(req, resp) {
            const id = req.params.id;
    
            livroDAO.remove(id)
                .then(resp.status(200).end())
                .then(err => console.log(err));
        };
    }

}

module.exports = LivroControlador;