import mongoose from "mongoose";
import { UserDocument } from "../types";
import config from "config";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {
        type: String,
        enum: ["user", "host"]
    }
  
},{
    timestamps: true
})

userSchema.pre<UserDocument>("save", async function(next){
    const user = this as UserDocument;
    if(!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
})
userSchema.methods.comparePassword = async function(candidatePassword: string) : Promise<boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((error)=> false );
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User