import z from 'zod';

export const ProjectTemplateSchema = z.object({
  projectTemplateId: z.number(),
  name: z.string().max(255),
  description: z.string().max(65535).nullable(),
  duration: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertProjectTemplateSchema = ProjectTemplateSchema.omit({
  // id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateProjectTemplateSchema = ProjectTemplateSchema.partial();

export type ZProjectTemplate = z.infer<typeof ProjectTemplateSchema>;
export type ZProjectTemplateInsert = z.infer<typeof insertProjectTemplateSchema>;
export type ZProjectTemplateUpdate = z.infer<typeof updateProjectTemplateSchema>;
