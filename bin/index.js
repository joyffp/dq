#!/usr/bin/env node
const photo = require("../core/photo.js")
const dqHttp = require("../core/http.js")
;(async () => {
    if (process.argv[2] == "photo") return photo()
    if (process.argv[2] == "http") return dqHttp()
    return help()
})()

function help() {
    console.info("")
    console.info("Usage: dq COMMAND ARGUMENTS")
    console.info("")
    console.info("Commands:")
    console.info("  photo                          变更文件名称")
    console.info("  http                           启动HTTP服务")
}
