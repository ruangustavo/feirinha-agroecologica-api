import express from 'express'

export const app = express()

app.get('/', (res) => {
  res.send('Hello World')
})

app.listen(3000 ?? process.env.PORT, () => {
  console.log('🚀 Server is running on port 3000')
})
