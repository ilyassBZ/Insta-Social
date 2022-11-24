import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

dotenv.config()
app.use(bodyParser.json({limit:"32mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"32mb",extended:true}))
app.use(cors())

app.use('/posts',postRoutes)
app.use('/user',userRoutes)

app.get('/', (req,res)=>{
	res.send('Welcome to instasocial api')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
	.then(()=>app.listen(PORT,()=>console.log(`srv running on port:${PORT}`)))
	.catch(err=>console.log(err.message))
