import {Request, Response} from "express"
import {getUsers,createUser,deleteUser,updateUser} from "../service/user.service";
import { CreateUserInput, UpdateUserSchemaType } from "../schema/user.schema";

export const getUserHandler = async (req: Request, res: Response)  : Promise<void> => {
  console.log("getUserHandler executing");
  try {
    const users = await getUsers();
    res.status(200).json({
      success: true,
      data: users,
      message: null,
    });
  } catch (error: unknown) {
    // Handle errors and return appropriate status codes
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        data: null,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        data: null,
        message: "Something went wrong",
      });
    }
  }
};


export const createUserHandler = async (req: Request<{},{},CreateUserInput["body"]>, res: Response)  : Promise<void> => {
  console.log("createUserHandler executing");
    try{
        const user = await createUser(req.body);
        res.status(201).send(user);
    }catch(error : unknown){
        if(error instanceof Error){
            res.status(409).send(error.message); //409 for conflict
        }
        else{
            res.status(409).send("Something went wrong");
        }
    }
}

export const deleteUserHandler = async (
    req: Request,
    res: Response
  )  : Promise<void> => {
    console.log("deleteUserHandler executing");
    try {
      const deletedUser = await deleteUser(req.params.id);
      res.status(200).send(deletedUser);

    } catch (error: unknown) {
      if (error instanceof Error) {
        const {message} = error;
        if (message === "User not found") {
          res.status(404).send(message); // Not Found
        }
        res.status(400).send(message); // Bad Request
      } else {
        // Generic fallback for unknown errors
        res.status(500).send("Something went wrong");
      }
    }
  };
  
export const updateUserHandler = async (req: Request<{},{},UpdateUserSchemaType["body"]>, res: Response) : Promise<void>=> {
  console.log("updateUserHandler executing");
  try{
    const updatedUser = await updateUser(req.body);
    res.status(200).send(updatedUser);
  }catch(error: unknown){
    if(error instanceof Error){
      const {message} = error;
      if(message === "User not found") res.status(404).send(message)//not found
      if(message === "Password does not match")  res.status(401).send(message); //unauthorized
      res.status(400).send(message); //Bad request
    }else{
      res.status(500).send("Something went wrong") //500 for unknown errors
    }
  }
}