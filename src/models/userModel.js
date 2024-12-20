import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    username:{
        type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
    email:{
        type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
          
    },
    password:{ 
        type: String,
            required: [true,"password is Required"],
            unique: true,
       },
    fullName:{
        type: String,
            required: true,
            trim: true, 
            index: true
    },
    avatar:{
        type: String, // cloudinary url
        required: true,
    },
    coverImage:{
        type: String, // cloudinary url
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref:"Video"
    },
    refreshToken:{
        type: String,
    },

}, {timestamps:true})

// secure password using bcrypt
userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next();
    this.pasword = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// using JWT tokens to give access to user 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
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
export const User = mongoose.model('User',userSchema)