require("dotenv").config()

const conn = require('./db/conn')

const Usuario = require("./models/Usuario")

const express = require("express")
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get("/usuarios/novo", (req,res) => {
    res.sendFile(`${__dirname}/views/formUsuario.html`)
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
