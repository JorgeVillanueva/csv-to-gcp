const {BigQuery} = require('@google-cloud/bigquery');

const createPurgedTable = async () => {
    const bigqueryClient = new BigQuery();
    
    const sqlPurgeTable = `
        CREATE OR REPLACE TABLE prefab-kit-146222.test.purged_users
        AS SELECT DISTINCT *
        FROM prefab-kit-146222.test.users
    `

    const sqlPurgeTableTwo = `
        CREATE OR REPLACE TABLE prefab-kit-146222.test.purged_users
        AS SELECT * FROM 
            (SELECT DISTINCT *
            FROM prefab-kit-146222.test.users
            WHERE Puesto <> "" AND
            Sucursal <> "" AND
            Regional <> "" AND
            Subdirector <> "" AND
            Director <> "" AND
            Perfil <> "")
    `

    const options = {
        query: sqlPurgeTableTwo,
        location: 'US',
    };

    await bigqueryClient.query(options);
}

module.exports = {
    createPurgedTable
}