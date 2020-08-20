// Importando Controladores e Modelos
const Livro = require('../modelos/livro');

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

// Traçando e exportando rotas
module.exports = (app) => {
    
    // Importando URIs
    const rotasLivro = LivroControlador.rotas();
    
    app.get(rotasLivro.lista, livroControlador.lista());

    app.route(rotasLivro.cadastro)
        .get(livroControlador.exibeFormCadastro())
        .post(Livro.valida(), livroControlador.cadastra())
        .put(Livro.valida(), livroControlador.edita());

    app.get(rotasLivro.edicao, livroControlador.exibeFormEdicao());

    app.delete(rotasLivro.delecao, livroControlador.remove());

};