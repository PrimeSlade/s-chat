import z from 'zod';

export const createMessageSchema = z.object({
  content: z.string().max(2000),
  roomId: z.string(),
});

export type CreateMessageDto = z.infer<typeof createMessageSchema>;
