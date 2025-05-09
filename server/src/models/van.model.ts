import mongoose from "mongoose";

const vanSchema = new mongoose.Schema({
    hostId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    type: {type: String, enum: ["Simple", "Rugged", "Luxury"], required: true},
    imageUrl : {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String}
})

export interface VanType{
    hostId: mongoose.Types.ObjectId;
    name: string;
    type: "Simple" | "Rugged" | "Luxury";
    imageUrl: string;
    price: number;
    description?: string;
}

const Van = mongoose.model<VanType>("Van", vanSchema)
export default Van;