var sql = require('mssql')

const config = new sql.ConnectionPool({
    server : "localhost" ,
    user : "sa",
    password:"03k09i20e01t",
    database : "Website_Sell_Watches",
    driver : "mssql",
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
}).connect().then(pool => {
    return pool;
}); 
module.exports = {
    config : config
}