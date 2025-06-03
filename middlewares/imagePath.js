const setimagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get('host')}/img/films/`;
    next()
}


module.exports = setimagePath

