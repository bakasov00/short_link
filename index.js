const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

// if (process.env.NODE_ENV === 'production') {
app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
// }

async function start() {
  try {
    mongoose
      .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      })
      .then(() => {
        console.log('DB connect')
        app.listen(PORT, () => {
          console.log(`App has been started on port ${PORT} `)
        })
      })
      .catch((e) => {
        console.log('DB error: ', e)
      })
  } catch (err) {
    console.log('Error: ', err.message)
    process.exit(1)
  }
}

start()
