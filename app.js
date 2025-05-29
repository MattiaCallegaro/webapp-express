//importo express
const express = require('express');
//utilizzo express
const app = express();
//definisco la porta del mio server
const port = 3000;
//importo i custom middleware
const errorsHandler = require("./middlewares/errors.Handler")
const notFound = require("./middlewares/notFound")

const filmRouter = require("./router/film")
const imagePath = require('./middlewares/imagePath')

//middleware per gli asset statici
app.use(express.static("public"))
//middleware per il parsing del body delle richieste
app.use(express.json())
//middleware per le immagini
app.use(imagePath)

//definisco la rotta base/entry-point
app.get("/", (req, res) => {
    console.log("Server dei film")
    res.send("Benvenuto nella mia webapp")
})
//importo il router
app.use("/films", filmRouter)

//Middleware per gli errori
app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server in ascolto alla porta ${port}`)
})