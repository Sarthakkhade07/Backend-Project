import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"                // to accesse the cookies and set the cookies 

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))   // accepct the data comming from the form in hte json format wiht max limit 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))          // accepct the data comming from the url
app.use(express.static("public"))          // to store the file pdf's into server
app.use(cookieParser())                     // setup the cookie parser


// import router

import userRouter from './routes/user.routes.js'

//route declaration

// app.use("/users", userRouter)    http://localhost:8000/users/register
                                // http://localhost:8000/users/login      it depends on what method you have defined in the route

                                
//standard api should be written as
app.use("/api/v1/users", userRouter)

export { app }