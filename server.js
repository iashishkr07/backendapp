import express from 'express'
import cors from 'cors'
import dotenv  from 'dotenv'
import connectDB from './config/db.js'
import signupRoutes from './routes/signupRoute.js'
import loginRoutes from './routes/loginRoute.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json())
connectDB()
// connectCloudinary()

app.use('/api',signupRoutes)
app.use('/api',loginRoutes)


app.get('/',(req,res)=>{
    res.send('Backend is live')
})

app.listen(port,()=>{
    console.log(`Server is running on http:localhost:${port}`)
})