import z from 'zod';

export const TaskInstanceSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  taskTemplateId: z.number().nullable(),
  sprintInstanceId: z.number().nullable(),
  priorityId: z.number().nullable(),
  statusId: z.number().nullable(),
  typeTaskId: z.number().nullable(),
  name: z.string().max(255),
  description: z.string().max(65535).nullable(),
  startDate: z.date().nullable(),
  dueDate: z.date().nullable(),
  order: z.number().nullable(),
  parentTask: z.number(),
  dependencyId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  commentId: z.number(),
});

export const insertTaskInstanceSchema = TaskInstanceSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateTaskInstanceSchema = TaskInstanceSchema.partial();

export type ZTaskInstance = z.infer<typeof TaskInstanceSchema>;
export type ZTaskInstanceInsert = z.infer<typeof insertTaskInstanceSchema>;
export type ZTaskInstanceUpdate = z.infer<typeof updateTaskInstanceSchema>;
