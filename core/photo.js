// 2018-10-05 init
// 2020-07-29 12:33:40 npm
const fs = require("fs")
const path = require("path")
function timestampToTime(timestamp) {
    var date = new Date(timestamp)
    var Y = date.getFullYear() + "-"
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-"
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " "
    var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ""
    var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ""
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
}

function fileDisplay() {
    let filePath = process.cwd()
    fs.appendFile(filePath + "/photoLog.js", new Date() + "\r\n", (error) => {})
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(function (filename) {
                if (filename == "index.js" || filename == ".DS_Store" || filename == "log.js") {
                    return
                }
                var filedir = path.join(filePath, filename)
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn("获取文件stats失败")
                    } else {
                        var isFile = stats.isFile()
                        var isDir = stats.isDirectory()
                        if (isFile) {
                            let extname = path.extname(filename).toLowerCase()
                            let newname = timestampToTime(stats.mtimeMs)
                            fs.renameSync(filedir, path.join(filePath, newname) + extname)
                            let w = filedir + " " + path.join(filePath, newname) + extname + "\r\n"
                            fs.appendFile(filePath + "/log.js", w, (error) => {})
                            console.log(w)
                        }
                        if (isDir) {
                            console.log(filedir)
                        }
                    }
                })
            })
        }
    })
}

module.exports = fileDisplay

// /Users/liujia/Pictures/照片图库.photoslibrary/Masters/2018/10/05/20181005-033151
