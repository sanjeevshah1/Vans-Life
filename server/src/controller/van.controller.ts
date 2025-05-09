import { Request, Response } from "express";
import { AddVanType, GetVanType } from "../schema/van.schema";
import { addVan, getVan, getVans, deleteVan, updateVan } from "../service/van.service";
import mongoose from "mongoose";

export async function addVanController(req: Request<{},{}, AddVanType["body"]>, res: Response): Promise<void> {
    console.log("Executing addVanController");
    try{
        const newVan = await addVan({ ...req.body, hostId: res.locals.user._id });
        res.status(201).json({message: "Van added succesfully", data: newVan});
    }catch(error: unknown){
        console.error("Error adding van:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export async function getVanController(req: Request<{id: string}>, res: Response): Promise<void> {
    console.log("Executing getVanController");
    try{
        const van = await getVan({ id: req.params.id });
        if (!van) {
            res.status(404).json({ message: "Van not found" });
            return;
        }
        res.status(200).json({message: "Van fetched succesfully", data: van});
    }catch(error: unknown){
        console.error("Error getting van:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export async function deleteVanController(req: Request<{id: string}>, res: Response): Promise<void> {
    console.log("Executing deleteVanController");
    try{
        const van = await deleteVan({ id: req.params.id });
        if(van.deletedCount === 0){
            res.status(404).json({message: "Van not found or Already deleted"})
            return
        }
        res.status(200).json({message: "Van deleted Succesfully"});
    }catch(error: unknown){
        console.error("Error getting van:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export async function getVansController(req: Request, res: Response): Promise<void> {
    console.log("Executing getVansController");
    try{
        const vans = await getVans();
        if (!vans || vans.length === 0) {
            res.status(404).json({ message: "No Vans Found" });
            return;
        }
        res.status(200).json({message: "Vans fetched succesfully", data: vans});
    }catch(error: unknown){
        console.error("Error getting vans:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}
export async function getHostVansController(req: Request, res: Response): Promise<void> {
    console.log("Executing getVansController");
    try{
        const vans = await getVans({hostId : res.locals.user._id});
        if (!vans || vans.length === 0) {
            res.status(404).json({ message: "No Vans Found" });
            return;
        }
        res.status(200).json({message: "Vans fetched succesfully", data: vans});
    }catch(error: unknown){
        console.error("Error getting vans:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export async function updateVanController(req: Request, res: Response): Promise<void> {
    console.log("Executing updateVanController");
    try{
        const { id } = req.params;
        const updates = req.body;
        const updatedVan = await updateVan({id , updates});
        res.status(200).json({message: "Van updated succesfully", data: updateVan});
    }catch(error: unknown){
        console.error("Error getting vans:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

