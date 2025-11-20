export const getEpisodes = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/episode")
  if (!res.ok) throw new Error("API error")
  return res.json()
}

export const getEpisode = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
  if (!res.ok) throw new Error("API error")
  return res.json()
}
