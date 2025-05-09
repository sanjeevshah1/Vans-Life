import { DecodedUser, UserInput, UserWithoutPassword } from "../types";
import User from "../models/user.model";
import {omit} from "lodash"
import bcrypt from "bcrypt"
import config from "config"
import { UserDocument } from "../types";
import { UpdateUserSchemaType } from "../schema/user.schema";
import mongoose, { FilterQuery } from "mongoose";

export async function getUsers(){
    try{
      const users = await User.find({role : "user"});
      return users.map((user) => omit(user.toJSON(), "password"))
    }catch(error : unknown){
      if(error instanceof Error){
          throw new Error(error.message);
      }
      else{
          throw new Error("Something went wrong");
      }
  }
}
export async function findUser(query: FilterQuery<UserDocument>){
    try{
      return await User.findOne(query).lean();
    }catch(error : unknown){
      if(error instanceof Error){
          throw new Error(error.message);
      }
      else{
          throw new Error("Something went wrong");
      }
  }
}


export async function validatePassword({email, password} : {email: string, password: string}) : Promise<Omit<UserDocument, "password"> | false > 
{ 
    try{
        const user : UserDocument | null = await User.findOne({email});
        if(!user) return false;

        const isValid = await user.comparePassword(password);
        if(!isValid) return false;
        
        return omit(user.toJSON(), 'password') as UserWithoutPassword;
    }catch(error : unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else{
            throw new Error("Something went wrong");
        }
    }
}

export async function createUser(input: UserInput){
    try{
        const user = await User.create(input);

         return omit(user.toJSON(),'password');
    }catch(error : unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else{
            throw new Error("Something went wrong");
        }
    }
}

export async function deleteUser(id: string) {
  try {
    const user = await User.findOne({ _id : id });
    if (!user) throw new Error("User not found");

    return await User.deleteOne({ _id : id });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function updateUser(input : UpdateUserSchemaType["body"]){
  try{
    const user = await User.findOne({email : input.email});
    if(!user) throw new Error("User not found");

    const isMatch =await user.comparePassword(input.password);
    if(!isMatch) throw new Error("Password does not match");

    if(input.updates.password){
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
      const hash = bcrypt.hashSync(input.updates.password,salt);
      input.updates.password = hash;
    }

    const updatedUser = await User.updateOne({email : input.email},input.updates)
    return updatedUser;
    
  }catch(error){
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}
