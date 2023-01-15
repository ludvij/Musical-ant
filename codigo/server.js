const express = require('express');


const app = express()


app.use('/', express.static('ant', {
	index: "index.html"
}))

const server = app.listen(3000, () => {
	console.log('running server on http://localhost:' + server.address().port)
})