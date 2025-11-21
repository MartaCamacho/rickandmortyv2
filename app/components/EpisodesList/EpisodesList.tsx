import { ActivityIndicator, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useEpisodes } from "@/hooks/useEpisodes"
import { spacing } from "@/theme/spacing"

import { Text } from "../Text"
import { EpisodeItem } from "./EpisodesListItem"

export const EpisodeList = () => {
  const { data, isLoading, isError } = useEpisodes()
  const navigation = useNavigation()

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
          navigation.navigate("EpisodeDetails", { episodeId: episode.id })
        }}
      />
    ))
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  list: {
    padding: spacing.md,
  },
})
