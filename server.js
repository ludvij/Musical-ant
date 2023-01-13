import express from 'express'


var app = express()


app.use('/', express.static('ant', {
	index: "index.html"
}))

var server = app.listen(3000, () => {
	console.log('running server on http://localhost:' + server.address().port)
})