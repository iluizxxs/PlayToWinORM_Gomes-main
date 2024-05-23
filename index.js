require("dotenv").config()

const conn = require('./db/conn')

const Usuario = require("./models/Usuario")

const express = require("express")

const exphbs = require("express-handlebars")

//Instanciar o servidor
const app = express()

//Vincular o Handlebars ao express
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

//Configurar o express para facilitar a captura de dados recebidos de formulários
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/usuarios", async (req, res) => {

    const usuarios = await Usuario.findAll({ raw: true })

    res.render("usuarios", { usuarios })

})

app.get("/usuarios/novo", (req, res) => {
    res.render("formUsuario")
})

app.post("/usuarios/novo", async (req, res) => {
    const nickname = req.body.nickname
    const nome = req.body.nome

    const dadosUsuarios = {
        nickname,
        nome,
    }

    const usuario = await Usuario.create(dadosUsuarios)

    res.send("Usuário inserido sob o id: " + usuario.id)

})

app.listen(8000)

conn
    .sync()
    .then(() => {
        console.log("Banco de dados conectado e sincronizado!")
    })
    .catch((err) => {
        console.log("Erro ao conectar/sincronizar o banco de dados: " + err)
    })
