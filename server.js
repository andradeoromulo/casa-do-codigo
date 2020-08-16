// Importanto o objeto app gerado pelo express
const app = require('./src/config/custom-express');

// Levantando o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));