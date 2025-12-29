import z from 'zod';

export const getMessagesSchema = z.object({
  roomId: z.string(),
  cursor: z.string().optional(),
  limit: z.number().optional().default(20),
});

export type GetMessagesDto = z.infer<typeof getMessagesSchema>;
