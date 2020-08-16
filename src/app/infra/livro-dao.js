class LivroDAO {
    constructor(db) {
        this._db = db;
    }

    listaLivros() {

        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (err, results) => {
                    if(err)
                        return reject('Não foi possível listar os livros');
                    return resolve(results);
                }
            );       
        });
    }
}

module.exports = LivroDAO;