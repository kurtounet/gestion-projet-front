import z from 'zod';

export const SprintTaskSchema = z.object({
  sprintTemplateId: z.number(),
  taskTemplateId: z.number(),
  taskOrder: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertSprintTaskSchema = SprintTaskSchema.omit({
  // id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateSprintTaskSchema = SprintTaskSchema.partial();

export type ZSprintTask = z.infer<typeof SprintTaskSchema>;
export type ZSprintTaskInsert = z.infer<typeof insertSprintTaskSchema>;
export type ZSprintTaskUpdate = z.infer<typeof updateSprintTaskSchema>;
