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

export { app }