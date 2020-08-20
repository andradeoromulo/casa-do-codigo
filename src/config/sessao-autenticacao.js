// Importando os módulos necessários para sessão e autenticação
const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Importando usuarioDAO e o bando de dados
const db = require('./database');
const UsuarioDAO = require('../app/infra/usuario-dao');

module.exports = (app) => {

    /* Configurando autenticação de acordo com uma estratégia específica.
    O construturo de LocalStrategy recebe os campos correspondentes ao usuário
    e senha na página de login e a função que de fato efetua o login*/
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField:  'senha'
        },
        function(email, senha, done) {
            const usuarioDAO = new UsuarioDAO(db);

            usuarioDAO.buscaPorEmail(email)
                .then(usuario => {
                    if(!usuario || usuario.senha != senha)
                        return done(null, false, { mensagem: 'Login e/ou senha incorretos!' });
                    
                    return done(null, usuario);
                })
                .catch(err => done(err, false));
        }
    ));

    // Configurando serialização e desserialização do usuário na sessão
    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        };

        done(null, usuarioSessao);
    })

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    // Configurando a sessão de fato com o express-session (que é um middleware)
    app.use(sessao({
        secret: 'node alura',
        genid: (req) => uuid(),
        resave: false,
        saveUninitialized: false
    }));

    // Inicializando o passport e a sessao
    app.use(passport.initialize());
    app.use(passport.session());

    // Adicionando o passport criado aqui dentro de toda requisição
    app.use((req, resp, next) => {
        req.passport = passport;
        next();
    })

};