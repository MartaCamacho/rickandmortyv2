import { useQuery } from "@tanstack/react-query"

import { getEpisodes } from "../services/api/episodes"

export const useEpisodes = () =>
  useQuery({
    queryKey: ["episodes"],
    queryFn: getEpisodes,
  })
