import {z, TypeOf} from "zod";

export const addVanSchema = z.object({
    body: z.object({
        imageUrl : z.string({required_error : "Image Url must be provided"}),
        type: z.enum(["Simple", "Rugged", "Luxury"],{required_error: "Type must be provided"}),
        name: z.string({required_error: 'Name must be provided'}),
        description: z.string().optional(),
        price: z.number({required_error: "Price must be provided"}),
    })
})
export type AddVanType = TypeOf<typeof addVanSchema>

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