import z from 'zod';

export const PrioritySchema = z.object({
  priorityId: z.number(),
  priorityLabel: z.string().max(50),
  priorityNumber: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertPrioritySchema = PrioritySchema.omit({
  // id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updatePrioritySchema = PrioritySchema.partial();

export type ZPriority = z.infer<typeof PrioritySchema>;
export type ZPriorityInsert = z.infer<typeof insertPrioritySchema>;
export type ZPriorityUpdate = z.infer<typeof updatePrioritySchema>;
