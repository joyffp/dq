// 2020-07-17 14:41:58 init
// 2020-07-28 16:53:21 fix try catch createReadStream
// 2020-07-29 14:11:14 npm
const http = require("http")
const path = require("path")
const fs = require("fs")
const os = require("os")
function getIPAdress() {
    var interfaces = os.networkInterfaces()
    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i]
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                return alias.address
            }
        }
    }
}
const myHost = getIPAdress()
function dqHttp() {
    const server = http.createServer((req, res) => {
        if (req.url == "/favicon.ico") {
            res.end()
            return
        }
        const filePath = path.join(process.cwd(), req.url)
        try {
            const stats = fs.statSync(filePath)
            if (stats.isFile()) {
                res.statusCode = 200
                fs.createReadStream(filePath).pipe(res)
            } else if (stats.isDirectory()) {
                res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
                fs.readdir(filePath, function (err, files) {
                    res.statusCode = 200
                    res.end(files.join("\r\n"))
                })
            }
        } catch (ex) {
            let _defaultFile = path.join(process.cwd(), "index.html")
            fs.exists(_defaultFile, function (exists) {
                if (exists) {
                    res.statusCode = 200
                    fs.createReadStream(_defaultFile).pipe(res)
                } else {
                    console.log("404")
                    res.statusCode = 404
                    res.end(`${filePath} is 404`)
                }
            })
        }
    })
    server.listen(7777, myHost, () => {
        console.info(`server startd at http://${myHost}:7777`)
    })
}
module.exports = dqHttp
