const errorsHandler = (err, req, res, next) => {
    const resObj = {
        status: "fail",
        message: "Errore interno del server"
    }

    if (process.env.ENVIRONMENT === "development") {
        resObj.details = err.stack;
    }

    return res.status(500).json(resObj);
};

module.exports = errorsHandler;