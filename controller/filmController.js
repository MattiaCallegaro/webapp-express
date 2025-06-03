const connection = require('../data/db')


//index
const index = (req, res) => {
    //recupero i post dal database
    connection.query("SELECT * FROM movies", (err, filmResult) => {
        //gestisco eventuali errori con il database
        if (err) {
            return res.status(500).json({ error: "Database query failed" })
        }

        //ciclo filmResult per sovrascrivere image
        const films = filmResult.map((film) => {
            const obj = {
                ...film,
                image: req.imagePath + film.image
            }
            return obj
        })
        // console.log(filmResult)

        res.json(films)
    })
}


//show
const show = (req, res) => {
    // recupero id
    const id = req.params.id;

    // salvo in una variabile la query da utilizzare
    const movieSql = `SELECT M.*,ROUND(AVG(R.VOTE)) AS voto_medio
     FROM movies M 
     JOIN reviews R ON R.movie_id = M.id
      WHERE M.id=?`

    const reviewSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
    `;

    // eseguo la query per mostrare la singola review
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Post non trovato' });

        // recupero il film
        const movie = movieResults[0];
        movie.image = `${req.protocol}://${req.get('host')}/img/films/${movie.image}`;


        // eseguo la query per mostrare le review
        connection.query(reviewSql, [id], (err, reviewResults) => {

            // Aggiungo le recensioni al film
            movie.reviews = reviewResults;


            res.json(movie);
        });
    });
};




module.exports = {
    index, show
}