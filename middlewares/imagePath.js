const setimagePath = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}/img/films`)
    req.imagePath = `${req.protocol}://${req.get('host')}/img/films/`
    next()
}

module.exports = setimagePath