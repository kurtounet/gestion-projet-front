import z from 'zod';

export const TaskTemplateSchema = z.object({
  id: z.number(),
  sprintTemplateId: z.number().nullable(),
  name: z.string().max(255),
  description: z.string().max(65535).nullable(),
  parentTask: z.number(),
  typeTaskId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertTaskTemplateSchema = TaskTemplateSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateTaskTemplateSchema = TaskTemplateSchema.partial();

export type ZTaskTemplate = z.infer<typeof TaskTemplateSchema>;
export type ZTaskTemplateInsert = z.infer<typeof insertTaskTemplateSchema>;
export type ZTaskTemplateUpdate = z.infer<typeof updateTaskTemplateSchema>;
