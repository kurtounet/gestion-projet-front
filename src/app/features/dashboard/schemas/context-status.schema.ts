import z from "zod";

export const ContextStatusSchema = z.object({
      contextId: z.number(),
  statusId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertContextStatusSchema = ContextStatusSchema.omit(
    {
       // id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateContextStatusSchema = ContextStatusSchema.partial()

export type ZContextStatus = z.infer<typeof ContextStatusSchema>;
export type ZContextStatusInsert = z.infer<typeof insertContextStatusSchema>;
export type ZContextStatusUpdate = z.infer<typeof updateContextStatusSchema>;
