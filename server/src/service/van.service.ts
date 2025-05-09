import mongoose from "mongoose";
import Van, { VanType } from "../models/van.model";

export async function addVan(van: VanType) : Promise<VanType>{
    try{
        const newVan = await Van.create(van);
        return newVan;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong : ${error}`);
    }
}

export async function updateVan({id , updates}: {id: string, updates: Partial<VanType>}) : Promise<VanType>{
    try{
        const updatedVan = await Van.findOneAndUpdate({_id : id}, updates, { new: true });
        if (!updatedVan) {
            throw new Error('Van not found');
        }
        return updatedVan;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong : ${error}`);
    }
}

export async function deleteVan({id} : {id: string}){
    try{
        const deletedVan = await Van.deleteOne({_id : id});   
        return deletedVan;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong : ${error}`);
    }
}

export async function getVan({id} : {id: string}) : Promise<VanType>{
    try{
        const van = await Van.findOne({_id : id});
        if (!van) {
            throw new Error('Van not found');
        }
        return van;
    }catch(error: unknown){
        throw new Error(error instanceof Error ? error.message : `Something went wrong : ${error}`);
    }
}

export async function getVans({ hostId }: { hostId?: mongoose.Types.ObjectId } = {}): Promise<VanType[]> {
    try {
        const vans = hostId
            ? await Van.find({ hostId })
            : await Van.find();
        return vans;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : `Something went wrong: ${error}`);
    }
}
