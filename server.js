const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(__dirname))

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
