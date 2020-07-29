#!/usr/bin/env node
const photo = require("../core/photo.js")
const dqHttp = require("../core/http.js")
;(async () => {
    if (process.argv[2] == "photo") return photo()
    if (process.argv[2] == "-p") return photo()
    if (process.argv[2] == "http") return dqHttp()
    if (process.argv[2] == "-h") return dqHttp()
    return help()
})()

function help() {
    console.info("")
    console.info("Usage: ffp COMMAND ARGUMENTS")
    console.info("")
    console.info("Commands:")
    console.info("  photo                          变更文件名称")
    console.info("  -p                             变更文件名称")
    console.info("  http                           启动HTTP服务")
    console.info("  -h                             启动HTTP服务")
}
