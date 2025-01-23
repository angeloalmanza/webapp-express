const express = require("express");
const moviesRouter = require("./routers/movies");

const app = express();
const port = process.env.SERVER_PORT;

//Gruppi delle rotte
app.use("/movies", moviesRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})