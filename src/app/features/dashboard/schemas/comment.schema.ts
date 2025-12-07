import z from "zod";

export const CommentSchema = z.object({
      id: z.number(),
  taskId: z.number().nullable(),
  userId: z.number().nullable(),
  subject: z.string().max(255).nullable(),
  content: z.string().max(4294967295).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertCommentSchema = CommentSchema.omit(
    {
        id: true,
        //createdAt: true,
        //updatedAt: true
    }
)
export const updateCommentSchema = CommentSchema.partial()

export type ZComment = z.infer<typeof CommentSchema>;
export type ZCommentInsert = z.infer<typeof insertCommentSchema>;
export type ZCommentUpdate = z.infer<typeof updateCommentSchema>;
