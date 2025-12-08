import z from 'zod';

export const FeatureSchema = z.object({
  id: z.number(),
  label: z.string().max(255),
});

export const insertFeatureSchema = FeatureSchema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateFeatureSchema = FeatureSchema.partial();

export type ZFeature = z.infer<typeof FeatureSchema>;
export type ZFeatureInsert = z.infer<typeof insertFeatureSchema>;
export type ZFeatureUpdate = z.infer<typeof updateFeatureSchema>;
