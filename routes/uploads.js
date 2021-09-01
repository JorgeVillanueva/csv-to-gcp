const { Router } = require("express") 
const { fileUpload } = require("../controllers/uploads")

const { validateFiles } = require("../middlewares/validate-files")

const router = Router()

router.post("/", validateFiles, fileUpload)

module.exports = router