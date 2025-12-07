import z from "zod";

export const ProjectTemplateSprintTemplateSchema = z.object({
      projectTemplateId: z.number(),
  sprintTemplateId: z.number(),
  sprintOrder: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertProjectTemplateSprintTemplateSchema = ProjectTemplateSprintTemplateSchema.omit(
    {
       // id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateProjectTemplateSprintTemplateSchema = ProjectTemplateSprintTemplateSchema.partial()

export type ZProjectTemplateSprintTemplate = z.infer<typeof ProjectTemplateSprintTemplateSchema>;
export type ZProjectTemplateSprintTemplateInsert = z.infer<typeof insertProjectTemplateSprintTemplateSchema>;
export type ZProjectTemplateSprintTemplateUpdate = z.infer<typeof updateProjectTemplateSprintTemplateSchema>;
