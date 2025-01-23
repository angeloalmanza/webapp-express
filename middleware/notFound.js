const notFound = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "La risorsa richiesta non esiste"
    });
};

module.exports = notFound;