import { useQuery } from "@tanstack/react-query"

import { getEpisode } from "../services/api/episodes"

export const useEpisode = (id: string) =>
  useQuery({
    queryKey: ["episode", id],
    queryFn: () => getEpisode(id),
  })
