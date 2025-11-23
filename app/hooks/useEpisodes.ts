import { useQuery } from "@tanstack/react-query"

const fetchEpisodesPage = async (page: number) => {
  const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status}: episodes list could not be obtained`)
  }
  return res.json()
}

export function useEpisodes() {
  return useQuery({
    queryKey: ["all-episodes"],
    queryFn: async () => {
      const firstPage = await fetchEpisodesPage(1)
      const totalPages = firstPage.info.pages
      const otherPages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => fetchEpisodesPage(i + 2)),
      )

      const allResults = [...firstPage.results, ...otherPages.flatMap((page) => page.results)]

      return allResults
    },
  })
}
