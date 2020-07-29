#!/usr/bin/env node
const photo = require("../index.js")
;(async () => {
    if (process.argv[2] == "photo") return photo()
    return help()
})()

function help() {
    console.info("")
    console.info("Usage: ffp COMMAND ARGUMENTS")
    console.info("")
    console.info("Commands:")
    console.info("  photo                          变更文件名称")
}
