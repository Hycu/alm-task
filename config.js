module.exports = {
    url: process.env.DATABASEURL || "mongodb://localhost/myshop",
    port: process.env.PORT || 8080,
    ip: process.env.IP || ""
}