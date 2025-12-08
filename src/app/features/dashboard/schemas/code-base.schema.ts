import z from 'zod';

export const CodeBaseSchema = z.object({
  id: z.number(),
  label: z.string().max(255),
  code: z.string().max(4294967295).nullable(),
  pathFile: z.string().max(255),
  feature: z.string().max(255),
});

export const insertCodeBaseSchema = CodeBaseSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateCodeBaseSchema = CodeBaseSchema.partial();

export type ZCodeBase = z.infer<typeof CodeBaseSchema>;
export type ZCodeBaseInsert = z.infer<typeof insertCodeBaseSchema>;
export type ZCodeBaseUpdate = z.infer<typeof updateCodeBaseSchema>;
