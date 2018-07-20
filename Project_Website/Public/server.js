
const path = require('path')
const express = require('express')

const routes = require('./routes')
const app = express()
const bodyParser = require('body-parser')
const validator = require('express-validator')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')

app.set('views', path.join(__dirname))
app.set('view engine', 'ejs')
// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 3000);

const middlewares = [
  express.static(path.join(__dirname, 'form')),
  express.static(path.join(__dirname, '/Home_Page/home.html')),
  express.static(path.join(__dirname + '/index.html')),
  express.static(path.join(__dirname + '/views/changeDetails.html')),
  bodyParser.urlencoded(),
  validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash()
]
app.use(middlewares)

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.get('/home', function(req,res) {
  res.sendFile(__dirname + "/Home_Page/home.html")
})

app.get('/changePassword', function(req, res) {
  res.sendFile(__dirname + '/views/changeDetails.html')
})

app.get('/changeEmail', function(req, res) {
  res.sendFile(__dirname + '/views/changeDetails.html')
})

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(app.get('port'), () => {
  console.log(`App running port: ` + app.get('port'))
})
