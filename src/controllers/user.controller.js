import asyncHandler from '../utils/asyncHandlers.js ';
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.model.js"
import {uploadOnCloudniary} from "../utils/coludinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) => {
    // get usert deatils from frontend
    // validation - not empty
    // check if the user is already exist - username and email
    // check for images, check for avtar
    // upload them to cloudiary, avtar
    // create a user object -create a entry in db
    // remove password and refresh token filed from response
    // check for user creation
    // return response

    const {username, email, fullname, password} = req.body 
    console.log('email:', email)

    //validate write if for all check
  /*  if (fullname === "") {
        throw new ApiError(400, "Fullname is required")
    } */

    if (
        [fullname, email, username, password].some((filed)=> filed?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    
    // already registered
        const existedUser = User.findOne({
            $or: [{username}, {email}]
        })

        if(existedUser){
            throw new ApiError(409, "User already exist")

        }

        const avatarLocalPath = req.files?.avtar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required")
        }

        const avatar = await uploadOnCloudniary(avatarLocalPath)
        const coverImage = await uploadOnCloudniary(coverImageLocalPath)


         if (!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }

        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()

        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken" 
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering a user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registerd successfully")
        )

})



export {registerUser}