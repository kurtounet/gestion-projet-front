import z from "zod";

export const TypeTaskSchema = z.object({
      id: z.number(),
  codeId: z.number().nullable(),
  name: z.string().max(100),
  pathFileScript: z.string().max(255).nullable(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  automatique: z.string(),
})

export const insertTypeTaskSchema = TypeTaskSchema.omit(
    {
        id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateTypeTaskSchema = TypeTaskSchema.partial()

export type ZTypeTask = z.infer<typeof TypeTaskSchema>;
export type ZTypeTaskInsert = z.infer<typeof insertTypeTaskSchema>;
export type ZTypeTaskUpdate = z.infer<typeof updateTypeTaskSchema>;
