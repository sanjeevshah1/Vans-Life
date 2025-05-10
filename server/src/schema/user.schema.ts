import {TypeOf, z} from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        password: z.string({
            required_error: "Password is required", 
        }).min(6, "Password must be at least 6 characters"),
        passwordConfirmation : z.string({
            required_error: "Password confirmation is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }).email("Not a valid email"),
        role: z.enum(['user', 'host'], {required_error: "Role is required"}),
    }).refine((data) => data.password === data.passwordConfirmation, 
    { message: "Passwords do not match", path: ["passwordConfirmation"] }
),
})
export type CreateUserInput = TypeOf<typeof createUserSchema>    

export const deleteUserSchema = z.object({
    params: z.object({
      id: z.string().min(1, "User ID is required").regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    }),
});

export const deleteUserSchema2 = z.object({
    body: z.object({
        email : z.string({
            required_error : "Email is required"
        }).email("Not a valid email"),
        password : z.string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters"),
    })
})
export type DeleteUserInput2 = TypeOf<typeof deleteUserSchema2>

export const updateUserSchema = z.object({
    body: z.object({
        email : z.string({
            required_error : "Email is required"
        }).email("Not a valid email"),
        password : z.string({
            required_error: "Password is required"
        }).min(6, "Password must be atleast 6 characters"),
        updates : z.object({
            email :z.string().email("Not a valid email").optional(),
            password:z.string().min(6,"Password must be atleast 6 characters").optional(),
            name:z.string().optional(),
        }).refine((data) => Object.keys(data).length > 0 , {
            message : "Atleast one update should be provided."
        })
    })
})

export type UpdateUserSchemaType = TypeOf<typeof updateUserSchema>