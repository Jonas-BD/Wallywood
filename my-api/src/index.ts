import express from 'express'
import dotenv from 'dotenv'
import { userRoutes } from './routes/userRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { loginRoutes } from './routes/loginRoutes.js'

dotenv.config({ quiet: true })

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/api/authorize', authRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})