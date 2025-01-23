const dbConnection = require("../data/dbConnection");

//INDEX
const index = (req, res) => {
    const sql = "SELECT * FROM `movies`;";

    dbConnection.query(sql, (err, movies) => {
        if (err) {
            const resObj = {
                status: "fail",
                message: "Errore interno del server"
            };
            if (process.env.ENVIRONMENT === "development") {
                resObj.details = err.stack;
            }
            return res.status(500).json(resObj);
        }

        return res.status(200).json({
            status: "success",
            data: movies
        })
    })
}

//SHOW
const show = (req, res) => {
    const id = req.params.id

    const sql = "SELECT * FROM movies WHERE id = ?;"

    const sqlReview = `
    SELECT reviews.* 
    FROM reviews
    JOIN movies
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?;
    `;

    dbConnection.query(sql, [id], (err, movies) => {
        if (err) {
            const resObj = {
                status: "fail",
                message: "Errore interno del server"
            };
            if (process.env.ENVIRONMENT === "development") {
                resObj.details = err.stack;
            }
            return res.status(500).json(resObj);
        }

        if (movies.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato"
            })
        }

        dbConnection.query(sqlReview, [id], (err, reviews) => {
            if (err) {
                const resObj = {
                    status: "fail",
                    message: "Errore interno del server"
                };
                if (process.env.ENVIRONMENT === "development") {
                    resObj.details = err.stack;
                }
                return res.status(500).json(resObj);
            }

            const moviesDetails = {
                ...movies[0],
                reviews: reviews
            }

            return res.status(200).json({
                status: "success",
                data: moviesDetails
            })
        })
    })
}

module.exports = {
    index,
    show
}