
import  express  from 'express'
import  colors from 'colors'; 
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'



//config 
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))
//Routes
app.use("/api/v1/auth",authRoutes)
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product/',productRoutes)
//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})