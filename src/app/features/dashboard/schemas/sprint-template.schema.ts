import z from "zod";

export const SprintTemplateSchema = z.object({
      sprintTemplateId: z.number(),
  name: z.string().max(255),
  description: z.string().max(65535).nullable(),
  duration: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertSprintTemplateSchema = SprintTemplateSchema.omit(
    {
       // id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateSprintTemplateSchema = SprintTemplateSchema.partial()

export type ZSprintTemplate = z.infer<typeof SprintTemplateSchema>;
export type ZSprintTemplateInsert = z.infer<typeof insertSprintTemplateSchema>;
export type ZSprintTemplateUpdate = z.infer<typeof updateSprintTemplateSchema>;
