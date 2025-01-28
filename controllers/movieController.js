const dbConnection = require("../data/dbConnection");

//INDEX
const index = (req, res, next) => {
    const filters = req.query;

    let sql = "SELECT * FROM `movies`";
    const params = [];

    // Costruzione dinamica della clausola WHERE
    const conditions = [];

    if (filters.search) {
        conditions.push("title LIKE ?");
        params.push(`%${filters.search}%`);
    }

    if (filters.genre) {
        conditions.push("genre = ?");
        params.push(filters.genre);
    }

    if (filters.release_year) {
        conditions.push("release_year = ?");
        params.push(filters.release_year);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
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
    const slug = req.params.slug;

    const sql = "SELECT * FROM movies WHERE slug = ?;"

    const sqlReview = `
    SELECT reviews.* 
    FROM reviews
    JOIN movies
    ON movies.id = reviews.movie_id
    WHERE movies.slug = ?;
    `;

    dbConnection.query(sql, [slug], (err, movies) => {
        if (err) {
            return next(new Error(err.message));
        }

        if (movies.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato"
            })
        }

        dbConnection.query(sqlReview, [slug], (err, reviews) => {
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

//SALVATAGGIO NUOVA RECENSIONE
const storeReview = (req, res, next) => {
    const movieId = req.params.id;
    const {name, vote, text} = req.body;

    // VALIDATION
    if(isNaN(vote) || vote < 0 || vote > 5) {
        return res.status(400).json({
            status: "fail",
            message: "Il voto deve essere un numero compreso tra 0 e 5"
        })
    }

    if(name.length < 4){
        return res.status(400).json({
            status: "fail",
            message: "Il nome deve contenere almeno 4 caratteri"
        })
    }

    if(text && text.length > 0 && text.length < 6){
        return res.status(400).json({
            status: "fail",
            message: "Il testo deve contenere almeno 6 caratteri"
        })
    }

    const movieSql = `
    SELECT *
    FROM movies
    WHERE id = ?
    `;

    dbConnection.query(movieSql, [movieId], (err, results) => {
        if (err) {
            return next(new Error(err.message));
        }

        if(results.length === 0) {
            return res.status(404).json({
                status: "Fail",
                message: "Film non trovato"
            })
        }
    });

    const sql = `
    INSERT INTO reviews(movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);
    `;

    dbConnection.query(sql, [movieId, name, vote, text], (err, results) => {
        if (err) {
            return next(new Error(err.message));
        }

        res.status(201).json({
            status: "Success",
            message: "Recensione inserita con successo"
        })
    })
}

module.exports = {
    index,
    show,
    storeReview
}