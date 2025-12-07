import z from "zod";

export const TechnologieSchema = z.object({
      id: z.number(),
  label: z.string().max(50),
})

export const insertTechnologieSchema = TechnologieSchema.omit(
    {
        id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateTechnologieSchema = TechnologieSchema.partial()

export type ZTechnologie = z.infer<typeof TechnologieSchema>;
export type ZTechnologieInsert = z.infer<typeof insertTechnologieSchema>;
export type ZTechnologieUpdate = z.infer<typeof updateTechnologieSchema>;
