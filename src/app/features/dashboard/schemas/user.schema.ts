import z from "zod";

export const UserSchema = z.object({
      userId: z.number(),
  role: z.string(),
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().max(320),
  password: z.string().max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertUserSchema = UserSchema.omit(
    {
       // id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateUserSchema = UserSchema.partial()

export type ZUser = z.infer<typeof UserSchema>;
export type ZUserInsert = z.infer<typeof insertUserSchema>;
export type ZUserUpdate = z.infer<typeof updateUserSchema>;
