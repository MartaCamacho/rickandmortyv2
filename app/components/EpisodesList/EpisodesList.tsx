import { ActivityIndicator } from "react-native"

import { useEpisodes } from "@/hooks/useEpisodes"
import { navigate } from "@/navigators/navigationUtilities"

import { Text } from "../Text"
import { EpisodeItem } from "./EpisodesListItem"

export const EpisodeList = () => {
  const { data, isLoading, isError } = useEpisodes()

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  if (isError) {
    return <Text text="Error loading episodes 😢" preset="subheading" />
  }

  const episodes = data ?? []

  if (Array.isArray(episodes) && episodes.length > 0)
    return episodes?.map((episode) => (
      <EpisodeItem
        key={episode.id}
        name={episode.name}
        airDate={episode.air_date}
        episodeCode={episode.episode}
        onPress={() => {
          navigate("EpisodeDetails", { id: episode.id })
        }}
      />
    ))
}
