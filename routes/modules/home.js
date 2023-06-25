const express = require('express')
const router = express.Router()

const url_data = require("../../models/url_data")
const shorten = require("../../tools/shorten")

router.get('/', (req, res) => {
    res.render('index')
})

//設定短網址
router.post('/', (req, res) => {
    //建立短網址亂碼和取得原始網址
    const short_url = shorten(5)
    const { origin_url } = req.body
    if (!origin_url) return res.redirect("/")
    //從資料庫中找是否有和原始網址相符的資料(若有則繼續、若無則新建立一組資料)
    url_data.findOne({ origin_url })
        .then(data =>
            data ? data : url_data.create({ short_url, origin_url })
        )
        //以下列資料重新渲染index頁面
        .then(data =>
            res.render("index", {
                origin_url,
                host_url: req.headers.origin,
                short_url: data.short_url,
            })
        )
        .catch(error => console.error(error))

})

module.exports = router
