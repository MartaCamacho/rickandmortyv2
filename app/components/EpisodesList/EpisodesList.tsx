import { FC } from "react"
import { ActivityIndicator } from "react-native"

import EpisodeItem from "@/components/EpisodesList/EpisodesListItem"
import { Text } from "@/components/Text"
import { useEpisodes } from "@/hooks/useEpisodes"
import { navigate } from "@/navigators/navigationUtilities"

const EpisodesList: FC = () => {
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

  return <Text text="There are no episodes to show 😢" preset="subheading" />
}

export default EpisodesList
