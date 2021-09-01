const { response } = require("express");

const validateFiles = (req, res = response, next) => {
    if (!req.files || !req.files.file || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "There is no files on the request" });
    }
    next()
}

module.exports = {
    validateFiles
}