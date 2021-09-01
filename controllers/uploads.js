const { response } = require("express")
const { listBuckets, uploadCSV } = require("../helpers/uplodad-file-cs")
const { loadCSVFromGCS } = require("../helpers/insert-to-bq")
const { createPurgedTable } = require("../helpers/purge-bq-table")

const fileUpload = async (req, res = response) => {
    try {
        // Revisar si tenemos acceso a los buckets
        /* const buckets = await listBuckets()
        console.log(buckets) */

        // Subir el archivo a cloud storage
        const fileUploadCS = await uploadCSV(req.files.file.tempFilePath)
        const { name, selfLink } = fileUploadCS.res[1]
        console.log("File uploaded successfully at:", selfLink)

        // Subir los datos del CSV a una tabla de bigquery
        const uploadToBQ = await loadCSVFromGCS(name)
        console.log("Data added to Big Query")

        // Purgar los datos de la tabla users y crear o reemplazar la tabla purged_users
        await createPurgedTable()
        console.log("The data was purged")

        res.json(uploadToBQ.status)
    } catch (msg) {
        console.log("Something went wrong.")
        res.status(400).json({ msg })
    }
}

module.exports = {
    fileUpload
}