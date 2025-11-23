import { useQuery } from "@tanstack/react-query"

export function useEpisode(id: number) {
  return useQuery({
    queryKey: ["episode-details", id],
    queryFn: async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      if (!res.ok) {
        throw new Error(`Error ${res.status}: episode could not be obtained`)
      }
      const episode = await res.json()

      const characters = await Promise.all(
        episode.characters.map(async (url: string) => {
          const characterResponse = await fetch(url)

          if (!characterResponse.ok) {
            throw new Error(`Error ${characterResponse.status}: character could not be obtained`)
          }
          return characterResponse.json()
        }),
      )

      return { ...episode, characters }
    },
  })
}
