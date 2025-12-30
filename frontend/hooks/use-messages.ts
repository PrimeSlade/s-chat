import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api/messages";
import { GetMessagesDto } from "@backend/shared/index";

type UseMessagesProps = Omit<GetMessagesDto, "cursor">;

export function useMessages({ roomId, limit = 20 }: UseMessagesProps) {
  return useInfiniteQuery({
    queryKey: ["messages", roomId, limit],
    queryFn: ({ pageParam }) =>
      getMessages({ roomId, cursor: pageParam, limit }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.pagination?.nextCursor ?? null,
    enabled: !!roomId,
  });
}
