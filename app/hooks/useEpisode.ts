import { useQuery } from "@tanstack/react-query"

export function useEpisode(id: number) {
  return useQuery({
    queryKey: ["episode-details", id],
    queryFn: async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      const episode = await res.json()

      const characters = await Promise.all(
        episode.characters.map(async (url: string) => {
          const res = await fetch(url)
          return res.json()
        }),
      )

      return { ...episode, characters }
    },
  })
}
