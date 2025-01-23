const connection = require("../data/connection_db");

const index = (req, res) => {
    return res.status(200).json({
        status: "success"
    })
}

const show = (req, res) => {

}

module.exports = {
    index,
    show
}