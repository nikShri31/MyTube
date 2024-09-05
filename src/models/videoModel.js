import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type: String, //cloudinary url
        required: true
    },
    thumbnail:{
        type: String, //cloudinary url
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    duration:{
        type: Number, 
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    views:{
        type: Number, 
        required: true
    },
    isPublished:{
        type: Boolean, 
        required: true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},
{timestamps:true}
)
videoSchema.plugin(mongooseAggregatePaginate);             // read documentation

export const Video = mongoose.model("Video", videoSchema)