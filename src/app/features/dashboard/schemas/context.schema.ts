import z from 'zod';

export const ContextSchema = z.object({
  id: z.number(),
  contextLabel: z.string().max(50),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertContextSchema = ContextSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateContextSchema = ContextSchema.partial();

export type ZContext = z.infer<typeof ContextSchema>;
export type ZContextInsert = z.infer<typeof insertContextSchema>;
export type ZContextUpdate = z.infer<typeof updateContextSchema>;
