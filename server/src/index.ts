import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

app.get('/hello', (req, res) => {
  res.status(200).json({ message: "hello" }) 
})

app.listen(PORT, () => {
  console.log('running')
})