const connection = require('../data/db')


//index
const index = (req, res) => {
    console.log("Elenco film")
}


//show
const show = (req, res) => {
    console.log("Dettaglio film")
}




module.exports = {
    index, show
}