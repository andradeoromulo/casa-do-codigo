// Importando os templates
const templates = require('../views/templates');
const passport = require('passport');

// Importando outros controladores
const LivroControlador = require('./livro-controlador');

class BaseControlador {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        };
    }

    exibeHome() {
        return function(req, resp) {
            resp.marko(templates.base.home);
        };
    }

    exibeFormLogin() {
        return function(req, resp) {
            resp.marko(templates.base.login);
        }
    }

    efetuaLogin() {
        return function(req, resp, next) {
            const passport = req.passport;
            
            /* O método abaixo recebe dois parâmetros: a estratégia de autenticação
            e a função callback que será executada após a autenticação */
            passport.authenticate('local', (erro, usuario, info) => {
                if(info)
                    return resp.marko(templates.base.login);
                
                if(erro)
                    return next(erro);
                
                /* Se chegou até aqui, tudo deu certo.
                A função login é adicionada ao req pelo authenticate.
                Ela recebe o objeto que queremos adicionar à sessão e uma
                função callback a ser executada após a serialização*/
                req.login(usuario, (erro) => {
                    if(erro)
                        return next(erro);

                    return resp.redirect(LivroControlador.rotas().lista);
                });
            })(req, resp, next);
        }
    }
}

module.exports = BaseControlador;