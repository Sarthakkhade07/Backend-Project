import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required: true
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        default:0
    },
    isPublish:{
        type:Boolean,
        default:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }



},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)                   // it should be used before export use in the form of plugin. we can run many aggregate querry

export const Video = mongoose.model("Video", videoSchema)