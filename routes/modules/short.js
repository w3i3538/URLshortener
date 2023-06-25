const express = require('express')
const router = express.Router()

const url_data = require("../../models/url_data")

//設定短網址路由
router.get("/:short_URL", (req, res) => {
    const { short_URL } = req.params
    //從資料庫查看有無相符短網址，若無則回報沒有，若有則連至該網址
    url_data.findOne({ short_url: short_URL })
        .then(data => {
            if (!data) {
                return res.render("error", {
                    errorMsg: "找不到以下短網址",
                    errorURL: req.headers.host + "/" + short_URL,
                })
            }
            res.redirect(data.origin_url)
        })
        .catch(error => console.error(error))
})

module.exports = router

