const express = require('express')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const url_data = require("./models/url_data")
const shorten = require("./tools/shorten")
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = express()
const port = 3000
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

//設定短網址
app.post('/', (req, res) => {
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

//設定短網址路由
app.get("/:short_URL", (req, res) => {
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


app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})