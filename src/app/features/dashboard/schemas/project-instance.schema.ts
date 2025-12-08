import z from 'zod';

export const ProjectInstanceSchema = z.object({
  id: z.number(),
  statusId: z.number().nullable(),
  priorityId: z.number().nullable(),
  projectTemplateId: z.number().nullable(),
  commentId: z.number().nullable(),
  name: z.string().max(255),
  description: z.string().max(65535).nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertProjectInstanceSchema = ProjectInstanceSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateProjectInstanceSchema = ProjectInstanceSchema.partial();

export type ZProjectInstance = z.infer<typeof ProjectInstanceSchema>;
export type ZProjectInstanceInsert = z.infer<typeof insertProjectInstanceSchema>;
export type ZProjectInstanceUpdate = z.infer<typeof updateProjectInstanceSchema>;
