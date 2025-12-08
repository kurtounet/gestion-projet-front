import z from 'zod';

export const StatusSchema = z.object({
  statusId: z.number(),
  statusName: z.string().max(50),
  statusContext: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertStatusSchema = StatusSchema.omit({
  // id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateStatusSchema = StatusSchema.partial();

export type ZStatus = z.infer<typeof StatusSchema>;
export type ZStatusInsert = z.infer<typeof insertStatusSchema>;
export type ZStatusUpdate = z.infer<typeof updateStatusSchema>;
