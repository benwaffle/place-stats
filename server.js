const express = require('express')
const app = express()
const stats = require('./stats.js')

app.get('/stats', (req, res) => {
    stats()
        .then(count => res.json(count))
        .catch(err => res.status(500).json({err}))
})

app.listen(3000, function () {
    console.log('listening on :3000')
})
