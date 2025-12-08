import z from 'zod';

export const FileSchema = z.object({
  id: z.number(),
  path: z.string().max(255),
  keyWord: z.string().max(4294967295).nullable(),
});

export const insertFileSchema = FileSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateFileSchema = FileSchema.partial();

export type ZFile = z.infer<typeof FileSchema>;
export type ZFileInsert = z.infer<typeof insertFileSchema>;
export type ZFileUpdate = z.infer<typeof updateFileSchema>;
