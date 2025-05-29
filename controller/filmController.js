const connection = require('../data/db')


//index
const index = (req, res) => {
    //recupero i post dal database
    connection.query("SELECT * FROM movies", (err, filmResult) => {
        //gestisco eventuali errori con il database
        if (err) {
            return res.status(500).json({ error: "Database query failed" })
        }
        console.log(filmResult)
        res.json(filmResult)
    })
}


//show
const show = (req, res) => {
    console.log("Dettaglio film")
}




module.exports = {
    index, show
}