import z from 'zod';

export const SprintInstanceSchema = z.object({
  id: z.number(),
  projectInstanceId: z.number().nullable(),
  priorityId: z.number(),
  sprintTemplateId: z.number().nullable(),
  sprintDependencyId: z.number(),
  name: z.string().max(100),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  statusId: z.number().nullable(),
  order: z.number().nullable(),
  commentId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertSprintInstanceSchema = SprintInstanceSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateSprintInstanceSchema = SprintInstanceSchema.partial();

export type ZSprintInstance = z.infer<typeof SprintInstanceSchema>;
export type ZSprintInstanceInsert = z.infer<typeof insertSprintInstanceSchema>;
export type ZSprintInstanceUpdate = z.infer<typeof updateSprintInstanceSchema>;
