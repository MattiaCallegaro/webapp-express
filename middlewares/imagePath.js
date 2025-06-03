const setimagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/films/`
    next()
}


module.exports = setimagePath

