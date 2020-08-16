class LivroDAO {
    constructor(db) {
        this._db = db;
    }

    lista() {

        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (err, results) => {
                    if(err)
                        return reject('Não foi possível listar os livros: ', err);
                    return resolve(results);
                }
            );       
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => { 
            this._db.run(
                'INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)',
                [livro.titulo, livro.preco, livro.descricao],
                (err) => {
                    if(err) 
                        return reject('Não foi possível cadastrar o livro: ', err);
                    return resolve();
                }
            )
        });
    }

    busca(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id],
                (err, result) => {
                    if(err)
                        return reject('O livro não foi encontrado: ', err);
                    return resolve(result);
                }
            )
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET titulo = ?, preco = ?, descricao = ?
                    WHERE id = ?`,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                (err) => {
                    if(err)
                        return reject('Não foi possível atualizar o livro: ', err);
                    return resolve();
                }
            )
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'DELETE FROM livros WHERE id = ?',
                [id],
                (err) => {
                    if(err)
                        return reject('Não foi possível excluir o livro: ', err);
                    return resolve();
                }
            )
        });
    }
}

module.exports = LivroDAO;