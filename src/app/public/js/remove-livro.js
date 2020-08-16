const tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener(('click'), (event) => {
    const elementoClicado = event.target;

    if(elementoClicado.dataset.type === 'remocao') {
        const livroId = elementoClicado.dataset.ref;

        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
            .then(result => {
                const tr = elementoClicado.closest(`#livro_${livroId}`);
                tr.remove();
            })
            .catch(err => console.log(err));
    }
});