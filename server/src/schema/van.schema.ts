import {z, TypeOf} from "zod";

export const addVanSchema = z.object({
    body: z.object({
        imageUrl : z.string({required_error : "Image Url must be provided"}).url("Image Url must be a valid url"),
        type: z.enum(["Simple", "Rugged", "Luxury"],{required_error: "Type must be provided"}),
        name: z.string({required_error: 'Name must be provided'}),
        description: z.string().optional(),
        price: z.number({required_error: "Price must be provided"}).positive("Price must be positive"),
    })
})
export type AddVanType = TypeOf<typeof addVanSchema>

export const updateVanSchema = z.object({
    params: z.object({id: z.string({required_error : "The id of van must be provided"})}),
    body: z.object({
        imageUrl : z.string().url("Image Url must be a valid url").optional(),
        type: z.enum(["Simple", "Rugged", "Luxury"]).optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive("Price must be positive").optional(),
    }).refine((data) => Object.keys(data).length > 0 , {
        message : "Atleast one update should be provided."
    })
})
export type UpdateVanType = TypeOf<typeof updateVanSchema>

export const getVanSchema = z.object({
    params : z.object({
        id: z.string({required_error : "The id of van must be provided"})
    })
})
export type GetVanType = TypeOf<typeof getVanSchema>  

export const deleteVanSchema = z.object({
    params : z.object({
        id: z.string({required_error : "The id of van must be provided"})
    })
})
export type DeleteVanType = TypeOf<typeof deleteVanSchema>    