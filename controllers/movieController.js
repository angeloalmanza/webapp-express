const dbConnection = require("../data/dbConnection");

//INDEX
const index = (req, res, next) => {
    const filters = req.query;

    let sql = "SELECT * FROM `movies`";
    const params = [];

    if (filters.search) {
        sql += `
        WHERE title LIKE ?;
        `;
        params.push(`%${filters.search}%`);
    }

    dbConnection.query(sql, params, (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }

        return res.status(200).json({
            status: "success",
            data: movies
        })
    })
}

//SHOW
const show = (req, res, next) => {
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
            return next(new Error(err.message));
        }

        if (movies.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato"
            })
        }

        dbConnection.query(sqlReview, [id], (err, reviews) => {
            if (err) {
                return next(new Error(err.message));
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