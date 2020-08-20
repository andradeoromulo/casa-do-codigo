// Importando Controladores e Modelos
const Livro = require('../modelos/livro');

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();
const BaseControlador = require('../controladores/base-controlador');

// Traçando e exportando rotas
module.exports = (app) => {
    
    // Importando URIs
    const rotasLivro = LivroControlador.rotas();

    // Criando middleware para obrigar a autenticação
    app.use(rotasLivro.autenticadas, (req, resp, next) => {
        if(req.isAuthenticated())
            next();
        else
            resp.redirect(BaseControlador.rotas().login);
    });
    
    app.get(rotasLivro.lista, livroControlador.lista());

    app.route(rotasLivro.cadastro)
        .get(livroControlador.exibeFormCadastro())
        .post(Livro.valida(), livroControlador.cadastra())
        .put(Livro.valida(), livroControlador.edita());

    app.get(rotasLivro.edicao, livroControlador.exibeFormEdicao());

    app.delete(rotasLivro.delecao, livroControlador.remove());

};