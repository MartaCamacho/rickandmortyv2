import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useEpisodes } from "@/hooks/useEpisodes"
import { spacing } from "@/theme/spacing"

import { Screen } from "../Screen"
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

  const episodes = data?.results ?? []

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <FlatList
        data={episodes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <EpisodeItem
            name={item.name}
            airDate={item.air_date}
            episodeCode={item.episode}
            onPress={() => navigation.navigate("EpisodeDetails", { id: item.id })}
          />
        )}
      />
    </Screen>
  )
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
