import z from 'zod';

export const Notification3Schema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  message: z.string().max(65535).nullable(),
  date: z.date().nullable(),
  type: z.string().max(50),
});

export const insertNotification3Schema = Notification3Schema.omit({
  id: true,
  //createdAt: true,
  //updatedAt: true
});
export const updateNotification3Schema = Notification3Schema.partial();

export type ZNotification3 = z.infer<typeof Notification3Schema>;
export type ZNotification3Insert = z.infer<typeof insertNotification3Schema>;
export type ZNotification3Update = z.infer<typeof updateNotification3Schema>;
