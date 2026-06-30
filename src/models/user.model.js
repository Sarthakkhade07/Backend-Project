import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        index:true,          // if you want to search it then keep its index on so that it will appear in the search of db.
                            // dont make everyone as index or else performance ki band bjj jayegi
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index:true
    },
    avtar:{
        type: String, //cloudinary url
        required: true
    },
    coverImage:{
        type: String, //cloudinary url
    },
    watchHistory:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type:String
    }

}, {timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();       // to avoid bydefault encrypt the password and save the password everytuime when we do change in hte user model

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,                                              // this is signin token payload
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
        return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)