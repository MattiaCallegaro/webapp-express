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
    //recupero l'id
    const id = req.params.id
    //creo la query 
    //recupero il singolo film con tutte le sue recensioni
    const sql = `
    SELECT movies.*, reviews.*
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id = ?`;
    //eseguo la query
    connection.query(sql, [id], (err, filmResult) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" + err })
        }
        //verifico se il post esiste
        if (filmResult.length === 0) return res.status(404).json({ error: "FIlm non found" })
        res.json(filmResult)
    })
}




module.exports = {
    index, show
}