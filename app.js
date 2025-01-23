const express = require("express");
const moviesRouter = require("./routers/movies");
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");

const app = express();
const port = process.env.SERVER_PORT;

//Middleware per la cartella public
app.use(express.static('public'));

//Gruppi delle rotte
app.use("/movies", moviesRouter);

//Registro errors handler middleware
app.use(errorsHandler);

//Registro not found middleware
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})